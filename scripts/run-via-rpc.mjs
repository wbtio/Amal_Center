/**
 * run-via-rpc.mjs
 * يرفع البيانات عبر Supabase RPC — بدون كلمة سر قاعدة البيانات.
 * شرط: تنفيذ CREATE FUNCTION في SQL Editor أولاً.
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const NEW_URL     = 'https://ulngcxjaxfpyadwqmukz.supabase.co';
const NEW_SR_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbmdjeGpheGZweWFkd3FtdWt6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDg1NjQ5MSwiZXhwIjoyMDk2NDMyNDkxfQ.QNkJr4cqVfAl9jlLpcWZ2RUjS0tZtlqQElpzMe2y7ms';

const supabase = createClient(NEW_URL, NEW_SR_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const FILES = [
  'data-1-categories.sql',
  'data-2-products-01.sql',
  'data-2-products-02.sql',
  'data-2-products-03.sql',
  'data-2-products-04.sql',
  'data-2-products-05.sql',
  'data-2-products-06.sql',
  'data-2-products-07.sql',
  'data-2-products-08.sql',
  'data-2-products-09.sql',
  'data-2-products-10.sql',
  'data-2-products-11.sql',
  'data-2-products-12.sql',
  'data-3-other-tables.sql',
];

async function runFile(filename) {
  const sql   = readFileSync(join(__dirname, filename), 'utf8');
  const start = Date.now();
  process.stdout.write(`▶  ${filename} … `);

  const { error } = await supabase.rpc('exec_sql', { sql });
  if (error) throw new Error(`${filename}: ${error.message}`);

  console.log(`✅  ${((Date.now() - start) / 1000).toFixed(1)}ث`);
}

(async () => {
  console.log('🚀  بدء رفع البيانات …\n');
  try {
    // اختبار الاتصال
    const { error: testErr } = await supabase.rpc('exec_sql', { sql: 'SELECT 1' });
    if (testErr) throw new Error(`الـ exec_sql غير موجود: ${testErr.message}\nتأكد من تنفيذ CREATE FUNCTION في SQL Editor أولاً.`);
    console.log('✅  exec_sql جاهز\n');

    for (const file of FILES) {
      await runFile(file);
    }

    // تحقق نهائي
    const { data } = await supabase
      .from('products').select('id', { count: 'exact', head: true });
    const { count } = await supabase
      .from('products').select('*', { count: 'exact', head: true });

    console.log('\n📊  تحقق نهائي:');
    const checks = ['categories','products','banners','home_sections','coupons'];
    for (const t of checks) {
      const { count } = await supabase.from(t).select('*', { count: 'exact', head: true });
      console.log(`   ${t}: ${count} سجل`);
    }
    console.log('\n🎉  اكتملت الهجرة بنجاح!');
  } catch (err) {
    console.error('\n❌  خطأ:', err.message);
    process.exit(1);
  }
})();
