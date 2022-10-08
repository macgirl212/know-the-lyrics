import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getOneSong } from '../controllers/getSongs'

const Game: NextPage = () => {
    const id = sessionStorage.getItem('id')

    const [songTitle, setSongTitle] = useState<string>('')
    const [songUrl, setSongUrl] = useState<string>('')
    const [lyrics, setLyrics] = useState<string[]>([])
    const [timestamps, setTimestamps] = useState<string[]>([])

    useEffect(() => {
        getOneSong(id)
            .then(function(result) {
                console.log(result)
                setSongTitle(result.title)
                setSongUrl(result.url)
                setLyrics(result.lyrics)
                setTimestamps(result.timestamps)
            })
    }, [])

    const useAudio = (url: any) => {
        const [audio] = useState(new Audio(url))
        const [playing, setPlaying] = useState(false)

        const toggle = () => setPlaying(!playing);

        useEffect(() => {
            playing ? audio.play() : audio.pause()
        }, [playing])

        useEffect(() => {
            audio.addEventListener('ended', () => setPlaying(false));
            return () => {
              audio.removeEventListener('ended', () => setPlaying(false));
            };
        }, []);

        return [playing, toggle] as const;
    }

    const Player = () => {
        const [playing, toggle] = useAudio(songUrl)

        return (
            <div>
              <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
            </div>
        );
    }

    return (
        <main>
            <h1>{songTitle}</h1>
            <Player />
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