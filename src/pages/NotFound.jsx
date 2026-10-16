import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>الصفحة دي مش موجودة</h1>
      <Link to="/">الرجوع للرئيسية</Link>
    </section>
  )
}
