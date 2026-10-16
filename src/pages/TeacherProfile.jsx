import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTeacherById } from '../services/teachersService.js'

// بروفايل المدرس + بوكس الحجز. الـ id بييجي من الرابط: /teachers/t1
export default function TeacherProfile() {
  const { id } = useParams()
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeacherById(id).then((data) => {
      setTeacher(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <p>جاري التحميل...</p>
  if (!teacher) return <p>المدرس ده مش موجود.</p>

  return (
    <section>
      <h1>{teacher.name}</h1>
      <p>{teacher.bio}</p>
      {/* TODO: النبذة والتقييمات والموقع التقريبي */}
      {/* TODO: بوكس الحجز (نوع الحصة، اليوم، الميعاد) */}
    </section>
  )
}
