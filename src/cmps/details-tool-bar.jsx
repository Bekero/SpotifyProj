import React from 'react'
import PlaySongToolBar from '../cmps/svg/play-song-tool-bar'
import LikeToolBar from '../cmps/svg/unfilled-like-tool-bar'
import OptsToolBar from '../cmps/svg/opts-song'

export function DetailsToolBar({ currStation }) {

    return (
        <>
            <div className="play-song-tool-bar-container"><button className="play-song-tool-bar"><PlaySongToolBar /></button></div>
            {!currStation.isLikedStation && <div className="like-tool-bar-container"><button className="like-tool-bar" ><span><LikeToolBar /></span></button></div>}
            {!currStation.isLikedStation && <div className="opts-tool-bar-container"><button className="opts-tool-bar" ><span><OptsToolBar /></span></button></div>}
        </>
    )
}