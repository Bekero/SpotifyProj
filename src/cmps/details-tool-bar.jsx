import React from 'react'
import PlaySongToolBar from '../cmps/svg/play-song-tool-bar'
import PauseSongToolBar from '../cmps/svg/pause-song-tool-bar'
import LikeToolBar from '../cmps/svg/unfilled-like-tool-bar'
import OptsToolBar from '../cmps/svg/opts-song'
import { useSelector } from 'react-redux'
import { setIsPlayingSong } from '../store/song.actions'
import { useDispatch } from 'react-redux'

export function DetailsToolBar({ station, user }) {
    const isPlayingSong = useSelector(state => state.songModule.isPlayingSong)
    const dispatch = useDispatch()

    const playCurrUrl = () => {
        dispatch(setIsPlayingSong(!isPlayingSong))
    }
    return (
        <>
            <div className="play-song-tool-bar-container"><button onClick={() => playCurrUrl()} className="play-song-tool-bar">{!isPlayingSong ? <PlaySongToolBar /> : <PauseSongToolBar />}</button></div>
            {station && <div className="like-tool-bar-container"><button className="like-tool-bar" ><span><LikeToolBar /></span></button></div>}
            {station && <div className="opts-tool-bar-container"><button className="opts-tool-bar" ><span><OptsToolBar /></span></button></div>}
        </>
    )
}