import React, { ReactNode, useState } from "react"
import Link from "next/link"
import NavDropdown from "../nav/NavDropdown"
import { motion } from "framer-motion"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"

interface NavProps {
  name: string
  slug: string
  onClick?: () => void
}

interface OverlayProps {
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const sidebarWidth = 300

const variants = {
  hidden: { left: -sidebarWidth },
  show: { left: 0 },
}

const navs = [
  {name: "Home", slug: "/"},
  {name: "AreaOne", slug: "/areas/area1"},
  {name: "AreaTwo", slug: "/areas/area2"},
  {name: "Timeline", slug: "/timeline"},
  {name: "Heatmap", slug: "/heatmap"},
]

export default function Navbar () {
  const [showMenu, setShowMenu] = useState(false)

  const onClick = () => setShowMenu(false)

  return (
    <header className="z-50 relative">
      <motion.nav 
        variants={variants}
        initial="hidden"
        animate={showMenu ? "show" : "hidden"}
        transition={{type:"linear"}} 
        className={`top-0 left-0 h-screen m-0 fixed
          flex flex-col justify-start items-center
          bg-gray-900 text-white shadow-lg`}
        style={{width: sidebarWidth}}
        >

        <motion.div 
          className="w-20 h-20 rounded-r-lg 
          absolute -right-20 top-1 z-50
        bg-blue-600
          grid justify-center content-center"
          onClick={() => setShowMenu(!showMenu)}
        >
          <motion.div
            variants={{
            hidden:{rotate:0},
            show:{rotate:180}
          }}
          initial="hidden"
          animate={showMenu ? "show" : "hidden"}
          >
            <FaAngleRight size={"2em"}/>
          </motion.div>
        </motion.div>

        {navs.map((data, index) => 
          <NavElement key={data.name} onClick={onClick} {...data} />
        )}
        <Overlay showMenu={showMenu} setShowMenu={setShowMenu}/>
      </motion.nav>
    </header>
  )
}

function NavElement ({name, slug, onClick} : NavProps) {

  return (

    // <div className="group block w-full h-full">
      <Link href={slug}>
        <div 
          onClick={onClick}
          className="h-20 w-full flex justify-center items-center z-10"
        >
          {name}
        </div>
      </Link>
    // </div>
  )
}


function NavDivider () {
  return (
    // <div className="h-full w-1 border-2"></div>
    <hr className="w-5/6"/>
  )
}

function Overlay ({showMenu, setShowMenu}: OverlayProps) {
  const variants = {
    hidden: {opacity: 0},
    show: {opacity: 0.7}
  }

  return (
  <motion.div
    initial="hidden"
    variants={ variants }
    animate={showMenu ? "show" : "hidden"}
    transition={{type:"linear"}} 
    className="fixed inset-0 z-0
      bg-black"
    style={{ pointerEvents: showMenu ? "auto" : "none" }}
    onClick={() => setShowMenu(false)}
  > 
    {/* <Link href="/">
      <div className="fixed h-full w-full"></div>
    </Link> */}
  </motion.div>
  )
}