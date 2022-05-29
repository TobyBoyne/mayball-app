import { ReactNode, useState } from "react"
import Link from "next/link"
import NavDropdown from "../nav/NavDropdown"
import { motion } from "framer-motion"

interface NavProps {
  children: ReactNode
  slug: string
}

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 200, y: 0 },
}

export default function Navbar () {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <header className="z-50 relative">
      <motion.nav 
        variants = {variants}
        initial="hidden"
        animate={showMenu ? "enter" : "hidden"}
        exit="exit"
        transition={{type:"linear"}} 
        className={`top-0 left-0 h-screen w-96 m-0 fixed
          flex flex-col justify-around items-center
          bg-gray-900 text-white shadow-lg`}
        >

        <div className="w-10 h-10 rounded-lg 
          absolute -right-10 top-1 z-50
        bg-blue-600"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? "<" : ">"}
        </div>

        <NavElement slug="/">Home</NavElement>

        <NavDivider/>

        <NavDropdown name="Areas">
          <NavElement slug="/area1">First Area</NavElement>
          <NavElement slug="/area2">Second Area</NavElement>
        </NavDropdown>

        <NavDivider/>

        <NavElement slug="/timeline">Timeline</NavElement>
        <NavElement slug="/heatmap">Heatmap</NavElement>
      </motion.nav>
    </header>
  )
}

function NavElement ({children, slug} : NavProps) {

  return (

    // <div className="group block w-full h-full">
      <Link href={slug}>
        <div className="h-full w-full flex justify-center items-center">{children}</div>
      </Link>
    // </div>
  )
}


function NavDivider () {
  return (
    // <div className="h-full w-1 border-2"></div>
    <hr />
  )
}