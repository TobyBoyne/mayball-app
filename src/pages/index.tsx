import Layout from '../common/components/Layout'
import MainPoster from "../../public/img/once-upon-a-time.png"
import Image from 'next/image'
import Link from 'next/link'
import styles from './Home.module.css'

import { FaMap, FaClock } from 'react-icons/fa'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function Home () {
  return (
    <>
    <motion.div
        className={styles.poster}
      >
        <Image src={MainPoster}
          alt="Downing May Ball 2022 Main Poster"
          layout="fill"
          objectFit='contain'
          objectPosition={"center"}/>
      </motion.div>
    <Layout title="Home">
      
      <h1
        className={styles.title}
      >
        Welcome to the Downing May Ball
      </h1>
      
      <div
        className={styles.allCards}
      >
        <HomeLink href="/map">
          <FaMap /> Map
        </HomeLink>
        <HomeLink href="/timeline">
          <FaClock /> Timeline
        </HomeLink>
      </div>

    </Layout>
    </>
  )
}

function HomeLink ({href, children} : {href: string, children: ReactNode}) {
  return (
    <Link href={href}>
      <a
        className={styles.card}
      >
        {children}
      </a>
    </Link>
  )
}