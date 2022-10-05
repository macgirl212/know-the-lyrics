import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Scores: NextPage = () => {
    return (
        <main className={styles.mainContainer}>
            <h1 className={styles.title}>Scores</h1>
            <Link href="/">
                <a className={styles.mainButton}>Play again</a>
            </Link>
        </main>
    )
}

export default Scores