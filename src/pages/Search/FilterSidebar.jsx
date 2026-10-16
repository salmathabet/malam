const selectClass =
  'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20'

// الفلاتر الجانبية: خاصة بصفحة البحث بس، علشان كده جوه فولدر Search
// TODO: نخلي الفلاتر شغالة (state + نبعتها لـ getTeachers)
export default function FilterSidebar({ filters, onChange }) {
  return (
    <aside className="flex h-fit flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-bold">الفلاتر</h2>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        المرحلة الدراسية
        <select className={selectClass} value={filters.level}
  onChange={(e) => onChange({ ...filters, level: e.target.value })}
>
          <option value="" >الكل</option>
          <option value="ابتدائي">ابتدائي</option>
          <option value="إعدادي">إعدادي</option>
          <option value="ثانوي">ثانوي</option>
          <option value="جامعة">جامعة</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        المسافة
        <select className={selectClass} value={filters.maxKm}
  onChange={(e) => onChange({ ...filters, maxKm: Number(e.target.value) })}
>
          <option value="3">حتى 3 كم</option>
          <option value="5">حتى 5 كم</option>
          <option value="10">حتى 10 كم</option>
          <option value="20">حتى 20 كم</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        السعر
        <select className={selectClass} value={filters.priceRange}
  onChange={(e) => onChange({ ...filters, priceRange: e.target.value })}
>
            <option value="">الكل</option>
            <option value="0-100">حتى 100 ج</option>
            <option value="100-150">100 - 150 ج</option>
            <option value="150-1000">أكتر من 150 ج</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        التقييم
        <select className={selectClass}  value={filters.minRating}
  onChange={(e) => onChange({ ...filters, minRating: Number(e.target.value) })}
>
          <option value="0">الكل</option>
          <option value="4">4 نجوم فأكتر</option>
          <option value="4.8">4.8 نجوم فأكتر</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-semibold">
        نوع الحصة
        <select className={selectClass} value={filters.mode}
 onChange={(e) => onChange({ ...filters, mode: e.target.value })}
>
          <option value="">الكل</option>
          <option value="home">عند الطالب</option>
          <option value="teacher">عند المدرس</option>
          <option value="online">أونلاين</option>
        </select>
      </label>

      <button
        type="button"
        className="h-11 rounded-lg bg-teal-700 font-semibold text-white transition-colors hover:bg-teal-800"
      >
        تطبيق الفلاتر
      </button>
    </aside>
  )
}
