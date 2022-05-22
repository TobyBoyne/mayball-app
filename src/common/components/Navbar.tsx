import type { ReactNode } from "react"
import Link from "next/link"

type NavProps = {
  children: ReactNode
  slug: string
}

export default function Navbar () {
  return (
    <header>
      <nav className="top-0 left-0 w-screen h-16 m-0 
                      flex flex-row justify-around items-center
                      bg-gray-900 text-white shadow-lg">

        <NavElement slug="/">Home</NavElement>

        <NavDivider/>

        <NavElement slug="/area1">First Area</NavElement>
        <NavElement slug="/area2">Second Area</NavElement>

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