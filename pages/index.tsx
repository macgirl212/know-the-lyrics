import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <main>
      <h1>Know the Lyrics</h1>
      <Link href="/select">
        <a>Play</a>
      </Link>
    </main>
  )
}

export default Home
