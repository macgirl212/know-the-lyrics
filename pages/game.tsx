import type { NextPage } from 'next'
import Link from 'next/link'

const Game: NextPage = () => {
    return (
        <main>
            <h1>Song title goes here</h1>
            <audio controls src=""></audio>
            <h2>Lyrics goes here</h2>
            <Link href="/select">
                <button>Submit answer</button>
            </Link>
            <br />
            <br />
            <Link href="/scores">
                <a>Abandon Game</a>
            </Link>
        </main>
    )
}

export default Game