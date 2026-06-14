import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';

// Blocks SSRF: reject non-http(s) schemes and hosts that resolve to internal ranges.
function isSafePublicUrl(raw: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return false;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;

  const host = parsed.hostname.toLowerCase();

  // Block loopback / link-local / private literals and obvious internal names.
  if (
    host === 'localhost' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host === '::1' ||
    host === '0.0.0.0'
  ) {
    return false;
  }

  // IPv4 literal in private / loopback / link-local ranges.
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 10) return false;
    if (a === 127) return false;
    if (a === 0) return false;
    if (a === 169 && b === 254) return false; // link-local (cloud metadata)
    if (a === 172 && b >= 16 && b <= 31) return false;
    if (a === 192 && b === 168) return false;
  }

  return true;
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 }
      );
    }

    if (!isSafePublicUrl(url)) {
      return NextResponse.json(
        { error: 'رابط غير مسموح به' },
        { status: 400 }
      );
    }

    const response = await fetch(url, { redirect: 'follow' });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    // Only proxy images — this endpoint exists to re-upload remote product/category art.
    if (!contentType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'المحتوى ليس صورة' },
        { status: 400 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
