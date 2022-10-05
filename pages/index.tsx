import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>Know the Lyrics</h1>
      <Link href="/select">
        <a className={styles.mainButton}>Play</a>
      </Link>
    </main>
  )
}

export default Home
