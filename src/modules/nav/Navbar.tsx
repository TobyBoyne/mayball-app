import { ReactNode, useState } from "react"
import Link from "next/link"
import NavDropdown from "../nav/NavDropdown"

type NavProps = {
  children: ReactNode
  slug: string
}

export default function Navbar () {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <header>
      <div className="w-10 h-10 rounded-lg 
        fixed right-1 top-1 z-50
       bg-blue-600"
       onClick={() => setShowMenu(!showMenu)}>{showMenu ? "Close" : "Menu"}

      </div>

      <nav className={`${showMenu ? "block" : "hidden"}
                      top-0 left-0 w-screen h-16 m-0 fixed
                      flex flex-row justify-around items-center
                      bg-gray-900 text-white shadow-lg`}>

        <NavElement slug="/">Home</NavElement>

        <NavDivider/>

        <NavDropdown name="Areas">
          <NavElement slug="/area1">First Area</NavElement>
          <NavElement slug="/area2">Second Area</NavElement>
        </NavDropdown>

        <NavDivider/>

        <NavElement slug="/timeline">Timeline</NavElement>
        <NavElement slug="/more">More</NavElement>
      </nav>
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
    <div className="h-full w-1 border-2"></div>
  )
}