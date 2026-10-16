import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `transition-colors hover:text-teal-700 ${
    isActive ? 'font-semibold text-teal-700' : 'text-slate-600'
  }`

// الشكل المشترك لكل الصفحات: Header ثابت + محتوى الصفحة + Footer
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="text-2xl font-bold text-teal-700">
            معلَم
          </Link>
          <nav className="flex flex-wrap items-center gap-6">
            <NavLink to="/search" className={navLinkClass}>
              ابحث عن مدرس
            </NavLink>
            <NavLink
              to="/login"
              className="rounded-lg border-2 border-teal-700 px-5 py-2 font-semibold text-teal-700 transition-colors hover:bg-teal-700 hover:text-white"
            >
              تسجيل الدخول
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
        معلَم
      </footer>
    </div>
  )
}
