import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Home from "./pages/Home"
import Entries from "./pages/Entries"
import AddItem from "./pages/Add"
import EditItem from "./pages/Edit"
import { AnimatePresence } from "framer-motion"

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="entries" element={<Entries />} />
          <Route path="add" element={<AddItem />} />
          <Route path="edit/:id" element={<EditItem />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <main className="max-w-md min-h-screen px-5 mx-auto text-slate-900 dark:bg-[#303642] dark:text-slate-50">
      <Outlet />
    </main>
  )
}
