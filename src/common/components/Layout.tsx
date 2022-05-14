import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'



type Props = {
  children: ReactNode
  title: string
}

export default function Layout( {children, title} : Props ) {
  return (
    <>
      <Head>
        <title>{title} | DCMB 2022</title>
        <meta name="description" content="Webapp created for Downing May Ball 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className='max-w-prose mx-auto
                      flex flex-col items-center'>
        <h1 className='text-center text-7xl my-10'>{title}</h1>
        {children}
      </main>
      <Footer />
    </>
  )
}