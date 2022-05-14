import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title: string
}

export default function AreaLayout( {children, title} : Props ) {
  return (
    <>
      <Head>
        <title>{title} | DCMB 2022</title>
        <meta name="description" content="Webapp created for Downing May Ball 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}