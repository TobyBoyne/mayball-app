import React, { ReactNode, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa"

interface NavProps {
  name: string
  slug: string
  onClick?: () => void
  showMenu: boolean
}

interface OverlayProps {
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

interface HeadBarProps extends OverlayProps {
  title: string
}

const sidebarWidth = 300

const variants = {
  hidden: { left: -sidebarWidth },
  show: { left: 0 },
}

const navs = [
  {name: "Home", slug: "/"},
  {name: "Map", slug: "/map"},
  // {name: "AreaOne", slug: "/areas/area1"},
  // {name: "AreaTwo", slug: "/areas/area2"},
  {name: "Timeline", slug: "/timeline"},
  {name: "Heatmap", slug: "/heatmap"},
]

export default function Navbar ({title}: {title: string}) {
  const [showMenu, setShowMenu] = useState(false)

  const onClick = () => {setShowMenu(false)}

  return (
    <header className="z-50 relative">
      <motion.nav 
        variants={variants}
        initial="hidden"
        animate={showMenu ? "show" : "hidden"}
        transition={{duration:0.4}} 
        className={`top-0 left-0 h-screen m-0 fixed
          flex flex-col justify-start items-center
          bg-teal-800 text-white shadow-lg`}
        style={{width: sidebarWidth}}
        >

        <HeadBar showMenu={showMenu} setShowMenu={setShowMenu} title={title} />
        
        {navs.map((data, index) => 
          <NavElement key={data.name} onClick={onClick} showMenu={showMenu} {...data} />
        )}
        <Overlay showMenu={showMenu} setShowMenu={setShowMenu}/>
      </motion.nav>
    </header>
  )
}

function NavElement ({name, slug, showMenu, onClick} : NavProps) {

  return (

    // <div className="group block w-full h-full">
      <Link href={slug}>
        <div 
          onClick={onClick}
          className="h-20 w-screen flex justify-center items-center z-10"
          style={{ pointerEvents: showMenu ? "auto" : "none" }}
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

function HeadBar ({showMenu, setShowMenu, title}: HeadBarProps) {
  const textVariants = {
    hidden: { opacity: 0, x: 50, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -50, y: 0 },
  }

  return (
    <motion.div 
      className="w-screen h-16
      fixed top-0 z-50
    bg-teal-800 opacity-80
      flex flex-row items-center"
      onClick={() => setShowMenu(!showMenu)}
      variants={{
        hidden:{left:0},
        show:{left: sidebarWidth}
        
      }}
      initial="hidden"
      animate={showMenu ? "show" : "hidden"}
      transition={{duration:0.4}} 
    >
      <motion.div
        className="ml-2"
        variants={{
        hidden:{rotate:0},
        show:{rotate:180}
      }}
      initial="hidden"
      animate={showMenu ? "show" : "hidden"}
      transition={{duration:0.4}} 
      >
        <FaAngleRight size={"2em"}/>
      </motion.div>
      <motion.div
        className="font-bold text-2xl ml-5"
        variants={textVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          type: "linear"
        }}
      >
        {title}
      </motion.div>
    </motion.div>
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
  /> 
  )
}