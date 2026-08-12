import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { query, page, source } = await req.json();

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json({ error: 'الرجاء إدخال كلمة بحث' }, { status: 400 });
    }

    const domain = source === 'beauty' ? 'world.openbeautyfacts.org' : 'world.openfoodfacts.org';

    const params = new URLSearchParams({
      search_terms: query.trim(),
      search_simple: '1',
      action: 'process',
      json: '1',
      page_size: '24',
      page: String(page || 1),
      fields: 'code,product_name,product_name_ar,product_name_en,image_front_url,image_url,brands,quantity',
    });

    const offRes = await fetch(`https://${domain}/cgi/search.pl?${params.toString()}`, {
      headers: { 'User-Agent': 'AmalCenterAdmin/1.0 (info@jaz.iq)' },
    });

    if (!offRes.ok) {
      return NextResponse.json({ error: 'تعذر الاتصال بقاعدة بيانات المنتجات' }, { status: 502 });
    }

    const data = await offRes.json();

    const products = (data.products || [])
      .filter((p: any) => p.product_name || p.product_name_ar || p.product_name_en)
      .map((p: any) => ({
        barcode: p.code,
        name_ar: p.product_name_ar || p.product_name || '',
        name_en: p.product_name_en || p.product_name || '',
        image_url: p.image_front_url || p.image_url || '',
        brand: p.brands || '',
        quantity: p.quantity || '',
      }));

    return NextResponse.json({ products, count: data.count || products.length });
  } catch (error: any) {
    console.error('Product search error:', error);
    return NextResponse.json({ error: 'حدث خطأ غير متوقع: ' + error.message }, { status: 500 });
  }
}
