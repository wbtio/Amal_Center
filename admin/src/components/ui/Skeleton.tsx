'use client';

/**
 * هياكل تحميل — تحافظ على شكل الصفحة أثناء الجلب بدل قفزة "جاري التحميل...".
 */

export function SkeletonRows({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3.5">
          <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: `${45 + (i % 3) * 12}%` }} />
            <div className="h-2.5 bg-gray-50 rounded animate-pulse w-1/4" />
          </div>
          <div className="h-6 w-16 bg-gray-100 rounded-lg animate-pulse flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonCards({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
              <div className="h-2.5 bg-gray-50 rounded animate-pulse w-1/3" />
            </div>
          </div>
          <div className="h-2.5 bg-gray-50 rounded animate-pulse" />
          <div className="h-2.5 bg-gray-50 rounded animate-pulse w-4/5" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonForm({ fields = 5 }: { fields?: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-2.5 bg-gray-100 rounded animate-pulse w-24" />
          <div className="h-9 bg-gray-50 border border-gray-100 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
}
