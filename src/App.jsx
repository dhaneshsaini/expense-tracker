import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Entries from "./pages/Entries"
import AddItem from "./pages/AddItem"
import { AnimatePresence } from "framer-motion"
import { useEffect } from "react"

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="entries" element={<Entries />} />
          <Route path="additem" element={<AddItem />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <main className="max-w-md min-h-screen px-5 mx-auto bg-[#303642] text-gray-50">
      <Outlet />
    </main>
  )
}
