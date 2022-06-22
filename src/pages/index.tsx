import Layout from '../common/components/Layout'
import Link from 'next/link'
import styles from './Home.module.css'

import { FaMap, FaClock, FaBookOpen, FaUtensils } from 'react-icons/fa'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const cardsContainer = {
  hidden: {opacity: 0},
  enter: {
    opacity: 1, 
    transition : {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delay: 4,
      
    }}
}

const card = {
  hidden: {opacity: 0, transform: "translateY(-50px)"},
  enter: {opacity: 1, transform: "translateY(0px)",
    transition: {
      duration: 1
    }}
}


export default function Home () {
  return (
    <>
    <Layout title="Home" homepage={true}>
      
      <h1
        className={styles.title}
      >
        Once Upon a Time in Hollywood
      </h1>
      
      <motion.div
        className={styles.allCards}
        variants={cardsContainer}
        initial="hidden"
        animate="enter"
      >
        <HomeLink href="/map">
          <FaMap /> <br /> Map
        </HomeLink>
        <HomeLink href="/timeline">
          <FaClock /> <br /> Timeline
        </HomeLink>
        <HomeLink href="/map">
          <FaBookOpen /> <br /> Programme
        </HomeLink>
        <HomeLink href="/map">
          <FaUtensils /> <br /> Allergens
        </HomeLink>
      </motion.div>

    </Layout>
    </>
  )
}

function HomeLink ({href, children} : {href: string, children: ReactNode}) {
  return (
    <Link href={href}>
      <motion.a
        className={styles.card}
        variants={card}
      >
        {children}
      </motion.a>
    </Link>
  )
}
