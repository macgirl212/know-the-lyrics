import type { NextPage } from 'next'
import Link from 'next/link'

const SelectSongPage: NextPage = () => {
    console.log("game page loaded")

    // song props need to connect to database

    return (
        <main>
            <h1>Select Song</h1>
            <h2>Randomly chosen song title goes here</h2>
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