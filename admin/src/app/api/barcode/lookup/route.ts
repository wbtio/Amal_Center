import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';

// أي باركود منتج حقيقي (UPC/EAN) هو رقم من 6 إلى 14 خانة.
const BARCODE_RE = /^\d{6,14}$/;

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { barcode } = await req.json();

    if (!barcode || typeof barcode !== 'string' || !BARCODE_RE.test(barcode)) {
      return NextResponse.json(
        { error: 'الرجاء إدخال باركود صالح (6 إلى 14 رقم)' },
        { status: 400 }
      );
    }

    const offRes = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,product_name_ar,product_name_en,brands,image_front_url,image_url,quantity,code`,
      { headers: { 'User-Agent': 'AmalCenterAdmin/1.0 (info@jaz.iq)' } }
    );

    if (!offRes.ok) {
      return NextResponse.json(
        { error: 'تعذر الاتصال بقاعدة بيانات الباركود' },
        { status: 502 }
      );
    }

    const offData = await offRes.json();

    if (offData.status !== 1 || !offData.product) {
      return NextResponse.json({ found: false });
    }

    const p = offData.product;
    const name_ar: string = p.product_name_ar || p.product_name || '';
    const name_en: string = p.product_name_en || p.product_name || '';
    const image_url: string = p.image_front_url || p.image_url || '';
    const brand: string = p.brands || '';
    const quantity: string = p.quantity || '';

    return NextResponse.json({
      found: true,
      name_ar,
      name_en,
      image_url,
      brand,
      quantity,
      barcode,
    });
  } catch (error: any) {
    console.error('Barcode lookup error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ غير متوقع: ' + error.message },
      { status: 500 }
    );
  }
}
