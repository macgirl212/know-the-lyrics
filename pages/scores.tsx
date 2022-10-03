import type { NextPage } from 'next'
import Link from 'next/link'

const Scores: NextPage = () => {
    return (
        <main>
            <h1>Scores</h1>
            <Link href="/">
                <a>Play again</a>
            </Link>
        </main>
    )
}

export default Scores