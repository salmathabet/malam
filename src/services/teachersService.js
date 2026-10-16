// طبقة جلب البيانات. دلوقتي بتقرا من ملف JSON تجريبي.
// لما نربط Supabase هنغيّر جوه الدوال دي بس، والصفحات متتغيرش.
import teachers from '../data/teachers.json'
import { distanceKm } from '../utils/distance.js'

// بنأخر الرد شوية عشان نحاكي الـ API الحقيقي ونجرب حالة "جاري التحميل"
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getTeachers({
  lat,
  lng,
  maxKm = 10,
  subject,
  minRating = 0,
  maxPrice,
  level,
  minPrice = 0,
  mode, // 'home' | 'center' | 'online'
  
} = {}) {
  await delay()

  return teachers
    .map((t) => ({
      ...t,
      distanceKm:
        lat != null && lng != null
          ? Math.round(distanceKm(lat, lng, t.lat, t.lng) * 10) / 10
          : null,
    }))
    .filter((t) => t.distanceKm == null || t.distanceKm <= maxKm)
    .filter((t) => !subject || t.subjects.includes(subject))
    .filter((t) => t.rating >= minRating)
    .filter((t) => maxPrice == null || t.pricePerHour <= maxPrice)
    .filter((t) => !mode || t.modes.includes(mode))
    .filter((t) => !level || t.levels.includes(level))
    .filter((t) => t.pricePerHour >= minPrice)
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
}

export async function getTeacherById(id) {
  await delay()
  return teachers.find((t) => t.id === id) ?? null
}
