import type { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getAllSongs } from '../controllers/getSongs'

const SelectSongPage: NextPage = () => {
    const [chosenSong, setChosenSong] = useState<string>('')
    useEffect(() => {
        getAllSongs()
            .then(function(result) {
                const randomSong = result[Math.floor(Math.random() * result.length)]
                setChosenSong(randomSong.title)
                sessionStorage.setItem('id', randomSong._id)
            })
    }, [])

    return (
        <main>
            <h1>{chosenSong}</h1>
            <Link href="/game">
                <a>Easy</a>
            </Link>
            <br />
            <Link href="/game">
                <a>Hard</a>
            </Link>
            <br />
            <br />
            <Link href="/scores">
                <a>Abandon Game</a>
            </Link>
        </main>
    )
}

export default SelectSongPage