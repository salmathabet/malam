import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TeacherCard from '../components/TeacherCard.jsx'
import { getTeachers } from '../services/teachersService.js'

// موقع مؤقت (وسط القاهرة). بعدين هنجيبه من الـ GPS أو من اختيار المستخدم.
const USER_LOCATION = { lat: 30.0444, lng: 31.2357 }

const SUBJECTS = ['رياضيات', 'لغة إنجليزية', 'علوم', 'فيزياء', 'لغة عربية', 'كيمياء']

const STEPS = [
  { n: 1, title: 'حدد موقعك والمادة', text: 'اكتب منطقتك أو استخدم الـ GPS واختار المادة والمرحلة.' },
  { n: 2, title: 'قارن واختار', text: 'شوف التقييمات والأسعار والمسافة وجدول المواعيد.' },
  { n: 3, title: 'احجز حصتك', text: 'اختار الميعاد وانتظر تأكيد المدرس، وبعد الحصة قيّمه.' },
]

const inputClass =
  'h-12 min-w-0 flex-1 basis-44 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20'

// الصفحة الرئيسية: بحث بالمادة والمنطقة + المواد الأكثر طلباً + مدرسين مميزين
export default function Home() {
  const navigate = useNavigate()
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    getTeachers({ ...USER_LOCATION, maxKm: 20 }).then((data) => setFeatured(data.slice(0, 3)))
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    // TODO: نبعت المادة والمرحلة والمنطقة مع الرابط (query params)
    navigate('/search')
  }

  return (
    <div className="flex flex-col gap-14">
      {/* Hero + البحث */}
      <section className="flex flex-col items-center gap-5 pt-6 text-center">
        <h1 className="text-3xl font-bold leading-snug md:text-5xl">
          اعثر على مدرس خصوصي قريب منك
        </h1>
        <p className="max-w-xl text-lg text-slate-600">
          ابحث حسب المادة والمنطقة، قارن التقييمات والأسعار، واحجز حصتك في دقايق.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-4xl flex-wrap gap-3 rounded-xl border border-slate-300 bg-white p-4 shadow-sm"
        >
          <label className="sr-only" htmlFor="subject">المادة</label>
          <input id="subject" placeholder="المادة (رياضيات، إنجليزي...)" className={inputClass} />
          <label className="sr-only" htmlFor="level">المرحلة</label>
          <input id="level" placeholder="المرحلة الدراسية" className={inputClass} />
          <label className="sr-only" htmlFor="area">المنطقة</label>
          <input id="area" placeholder="المنطقة أو المحافظة" className={inputClass} />
          <button
            type="submit"
            className="h-12 rounded-lg bg-teal-700 px-8 font-semibold text-white transition-colors hover:bg-teal-800"
          >
            بحث
          </button>
        </form>

        <button
          type="button"
          className="h-11 rounded-lg border-2 border-dashed border-teal-700 px-5 text-sm text-teal-700 transition-colors hover:bg-teal-50"
        >
          استخدم موقعي الحالي (GPS)
        </button>
      </section>

      {/* المواد */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">المواد الأكثر طلباً</h2>
        <div className="flex flex-wrap gap-3">
          {SUBJECTS.map((name) => (
            <Link
              key={name}
              to="/search"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold transition-colors hover:border-teal-700 hover:text-teal-700"
            >
              {name}
            </Link>
          ))}
        </div>
      </section>

      {/* مدرسين مميزين */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">مدرسين مميزين بالقرب منك</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>
      </section>

      {/* إزاي بتشتغل */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">إزاي بتشتغل؟</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="flex flex-col gap-2 rounded-xl border-2 border-dashed border-slate-300 p-5"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-teal-700 font-bold text-white">
                {s.n}
              </div>
              <h3 className="font-bold">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
