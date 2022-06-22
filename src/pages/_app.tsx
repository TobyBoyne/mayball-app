import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import "../common/font-awesome"
import { AnimatePresence } from 'framer-motion'

import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps, router }: AppProps) {
  return (
  <>
    <Head>
      <title>DCMB 2022</title>
      <meta name="description" content="Webapp created for Downing May Ball 2022" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <AnimatePresence
      exitBeforeEnter
      initial={false}
      onExitComplete={() => window.scrollTo(0,0)}
    >
      <Component key={router.route} {...pageProps} />
    </AnimatePresence>
  </>
  )
}

export default MyApp
