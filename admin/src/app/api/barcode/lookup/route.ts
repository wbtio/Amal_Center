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

    const fields = 'product_name,product_name_ar,product_name_en,brands,image_front_url,image_url,quantity,code';
    const headers = { 'User-Agent': 'AmalCenterAdmin/1.0 (info@jaz.iq)' };

    // نجرب أولاً قاعدة المنتجات الغذائية، وإن لم نجد الباركود نجرب قاعدة العطور ومستحضرات التجميل
    let offData: any = null;
    for (const domain of ['world.openfoodfacts.org', 'world.openbeautyfacts.org']) {
      const offRes = await fetch(
        `https://${domain}/api/v2/product/${barcode}.json?fields=${fields}`,
        { headers }
      );
      if (!offRes.ok) continue;
      const data = await offRes.json();
      if (data.status === 1 && data.product) {
        offData = data;
        break;
      }
    }

    if (!offData) {
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
