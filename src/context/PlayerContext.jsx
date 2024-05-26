import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef();
    const seekBar = useRef();
    const seekBg = useRef();

    const [Song, setSong] = useState(songsData[0]);
    const [PlayStatus, setPlayStatus] = useState(false);

    const [time, settime] = useState({
        currentTime: {
            seconds: 0,
            minutes: 0
        },
        totalTime: {
            seconds: 0,
            minutes: 0
        }
    })

    const Play = (e) => {
        audioRef.current.play();
        console.log(e)
        setPlayStatus(true);
    }

    const Pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }
    const playWithId = async (Id) => {
        await setSong(songsData[Id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const Prev_icon =async () => {
        if (Song.id > 0) {
            await setSong(songsData[Song.id - 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }
    const Next_icon =async () => {
        if (Song.id < songsData.length-1) {
            await setSong(songsData[Song.id + 1]);
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const seekSong = (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX/ seekBar.current.offsetWidth) * audioRef.current.duration);
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = Math.floor(audioRef.current.currentTime / audioRef.current.duration) * 100 + "%";
                // seekBg.current.style.background = `linear-gradient(to right, #fff ${Math.floor(audioRef.current.currentTime / audioRef.current.duration) * 100}% , transparent)`

                settime({
                    currentTime: {
                        seconds: Math.floor(audioRef.current.currentTime % 60),
                        minutes: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        seconds: Math.floor(audioRef.current.duration % 60),
                        minutes: Math.floor(audioRef.current.duration / 60)
                    }
                })

            }

        }, 1000);
    }, [audioRef])


    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        Song, setSong,
        PlayStatus, setPlayStatus,
        time, settime,
        Play, Pause,
        playWithId,
        Prev_icon,
        Next_icon,
        seekSong,
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider;