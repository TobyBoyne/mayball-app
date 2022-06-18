import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Navbar from '../modules/nav/Navbar'
import "../common/font-awesome"


function MyApp({ Component, pageProps, router }: AppProps) {
  return (
  <>
    <Head>
      <title>DCMB 2022</title>
      <meta name="description" content="Webapp created for Downing May Ball 2022" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />
  
    {/* <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0,0)}
    > */}
      <Component key={router.route} {...pageProps} />
    {/* </AnimatePresence> */}
  </>
  )
}

export default MyApp
