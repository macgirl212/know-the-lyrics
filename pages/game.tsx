import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getOneSong } from '../controllers/getSongs'
import styles from '../styles/Game.module.scss'

const Game: NextPage = () => {
    const id = sessionStorage.getItem('id')

    const [songTitle, setSongTitle] = useState<string>('')
    const [songUrl, setSongUrl] = useState<string>('')
    const [lyrics, setLyrics] = useState<string[]>([])
    const [timestamps, setTimestamps] = useState<string[]>([])
    const [lyricIndex, setLyricIndex] = useState<number>(0)
    const [currentLyrics, setCurrentLyrics] = useState<string>('')

    useEffect(() => {
        // initial setup for current song
        getOneSong(id)
            .then(function(result) {
                setSongTitle(result.title)
                setSongUrl(result.url)
                setLyrics(result.lyrics)
                setTimestamps(result.timestamps)
            })
    }, [])

    const timeUpdate = (e: any) => {
        const currentTime = e.target.currentTime

        // dynamically change visible lyrics from current time
        if (currentTime > timestamps[lyricIndex]) {
            setCurrentLyrics(lyrics[lyricIndex])
            setLyricIndex(lyricIndex + 1)
        }
    }

    return (
        <main className={styles.mainContainer}>
            <h1>{songTitle}</h1>
            <audio src={songUrl} onTimeUpdate={(e) => timeUpdate(e)} controls />
            <h2 className={styles.currentLyrics}>{currentLyrics}</h2>
            <div className={styles.gameButtonsDiv}>
                <Link href="/select">
                    <a className={styles.gameButtons}>Submit answer</a>
                </Link>
                <Link href="/scores">
                    <a className={styles.gameButtons}>Abandon Game</a>
                </Link>
            </div>
        </main>
    )
}

export default Game