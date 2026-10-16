import { Link } from 'react-router-dom'

// كارت مدرس واحد. موجود في components لأنه بيتستخدم في أكتر من صفحة
// (نتائج البحث + المدرسين المميزين في الرئيسية)
export default function TeacherCard({ teacher }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="size-14 shrink-0 rounded-full bg-slate-200" />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold">{teacher.name}</h3>
            {teacher.verified && (
              <span className="rounded-full border border-teal-700 px-2 py-0.5 text-xs font-semibold text-teal-700">
                موثّق
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600">
            {teacher.subjects.join('، ')} - {teacher.area}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          {teacher.rating} نجمة ({teacher.reviewsCount} تقييم)
        </span>
        {teacher.distanceKm != null && (
          <span className="font-semibold text-teal-700">{teacher.distanceKm} كم</span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold">{teacher.pricePerHour} ج / حصة</span>
        <Link
          to={`/teachers/${teacher.id}`}
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          عرض البروفايل
        </Link>
      </div>
    </div>
  )
}
