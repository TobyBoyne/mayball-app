import type { ReactNode } from 'react'
import Footer from './Footer'
import Head from 'next/head'
import { motion } from 'framer-motion'
import BackgroundImage from './BackgroundImage'
import Navbar from "./Navbar"


interface LayoutProps {
  children: ReactNode
  title: string | undefined
  homepage?: boolean
}

const variants = {
  hidden: { opacity: 0, x: 200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -200, y: 0 },
}

const homeVariants = {
  hidden: { opacity: 0},
  enter: { opacity: 1},
  exit: { opacity: 0},
}


export default function Layout( {children, title, homepage=false} : LayoutProps ) {
  return (
    <>
      <Head>
        <title>{title} | DCMB 2022</title>
      </Head>
      <BackgroundImage homepage={homepage}/>

      <Navbar title={title as string}/>
      
      <motion.main
        variants = {homepage ? homeVariants : variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{
          duration: homepage ? 1 : 0.4, 
          delay: homepage ? 2 : 0,
          // when: "beforeChildren"
        }} 
        className='mx-auto
          flex flex-col items-center h-screen'
        style={{
          maxWidth: "min(65ch, 80%)",
          marginTop: "96px"
        }}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  )
}