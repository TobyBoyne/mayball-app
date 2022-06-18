import type { ReactNode } from 'react'
import Navbar from '../../modules/nav/Navbar'
import Footer from './Footer'
import Head from 'next/head'
import { motion } from 'framer-motion'
import BackgroundImage from './BackgroundImage'


interface LayoutProps {
  children: ReactNode
  title: string | undefined
}

// const variants = {
//   hidden: { opacity: 0, x: 200, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: -200, y: 0 },
// }

const variants = {}

export default function Layout( {children, title} : LayoutProps ) {
  return (
    <>
      <Head>
        <title>{title} | DCMB 2022</title>
      </Head>
      <BackgroundImage />
      <motion.main
        variants = {variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{type:"linear"}} 
        className='mx-auto my-10
          flex flex-col items-center'
        style={{
          maxWidth: "min(65ch, 80%)"
        }}
      >
        {/* <h1 className='text-center text-3xl my-10'>{title}</h1> */}
        {children}
      </motion.main>
      <Footer />
    </>
  )
}