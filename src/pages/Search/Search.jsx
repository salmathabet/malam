import { useEffect, useState } from 'react'
import { getTeachers } from '../../services/teachersService.js'
import TeacherCard from '../../components/TeacherCard.jsx'
import FilterSidebar from './FilterSidebar.jsx'

// موقع مؤقت (وسط القاهرة). بعدين هنجيبه من الـ GPS أو من اختيار المستخدم.
const USER_LOCATION = { lat: 30.0444, lng: 31.2357 }

export default function Search() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)

  

  const [filters, setFilters] = useState({ mode: '' , level: '' })


  const [minPrice, maxPrice] = filters.priceRange
  ? filters.priceRange.split('-').map(Number)
  : [0, 100000]


  
  useEffect(() => {
  getTeachers({
    ...USER_LOCATION,
    maxKm: filters.maxKm,
    mode: filters.mode,
    level: filters.level,
    minRating: filters.minRating,
    priceRange: '',
  }).then((data) => {
    setTeachers(data)
    setLoading(false)
  })
}, [filters])

  

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{teachers.length} مدرس قريب منك</h1>
        <span className="text-sm text-slate-500">ترتيب: الأقرب أولاً</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr_1fr]">
        <FilterSidebar filters={filters} onChange={setFilters} />

        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-slate-500">جاري التحميل...</p>
          ) : teachers.length === 0 ? (
            <p className="text-slate-500">مفيش مدرسين بالمواصفات دي.</p>
          ) 
        : (
            teachers.map((t) => <TeacherCard key={t.id} teacher={t} />)
          )}
        </div>

        {/* TODO: الخريطة (Leaflet + OpenStreetMap) */}
        <div className="flex h-96 items-center justify-center rounded-xl border-2 border-dashed border-slate-400 bg-slate-100 font-semibold text-slate-500 lg:sticky lg:top-6 lg:h-[34rem]">
          خريطة (Leaflet)
        </div>
      </div>
    </section>
  )
}
