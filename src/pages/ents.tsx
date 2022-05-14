import type { NextPage } from 'next'
import type { ReactElement } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import AreaLayout from '../common/components/AreaLayout'


export default function Page() {
  return (
    <AreaLayout title={"Ents"}>
    <h1>Title</h1>
    <p> Text </p>
    </AreaLayout>
  )
}