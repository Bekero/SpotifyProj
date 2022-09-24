import FilledLikeToolBar from "./svg/filled-like-tool-bar"
import UnfilledLikeToolBar from "./svg/unfilled-like-tool-bar"
import OptsSvg from './svg/opts-song'
import PlaySong from '../cmps/svg/play-song-svg'
import { Draggable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

export function SongPreview({ station, currSong, songIdx, currStation, playHover, playCurrUrl, addToLikedPlaylist, currSongIdx, addToPlaylist, user }) {
    const isPlayingSong = useSelector(state => state.songModule.isPlayingSong)
    const [songHover, setSongHover] = useState()

    function isSongLiked(songId) {
        if (!user) return false
        return user.likedSongs?.some(song => song.id === songId)
    }
    if (!station && !user) return <div>Loading...</div>
    return <>
        {
            <Draggable key={currSong.id} draggableId={currSong.id} index={songIdx}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        onMouseOver={() => setSongHover(true)}
                        onMouseLeave={() => setSongHover(false)}
                        className={`song-preview ${(isPlayingSong && currSongIdx === songIdx) ? 'active' : ''}`}>
                        <div className="song-number-play">
                            {songHover ? <div className="play-song-preview"><button onClick={() => { station ? playCurrUrl(songIdx, station._id) : playCurrUrl(songIdx, undefined, user) }}>{<PlaySong />}</button></div> : 
                            <div className="song-index">{songIdx + 1}</div>
}
                        </div>
                        <div className='song-list-title-container'>
                            <div className='song-list-title-img-container'>
                                <img className="song-img" src={`${currSong.imgUrl}`} />
                            </div>
                            <div className='song-list-title'>
                                <div className="song-title">{currSong.title}</div>
                                <div className="artists-name">Artists</div>
                            </div>
                        </div>
                        <div className="album-name">
                            <span>Album name</span>
                        </div>
                        <div className='date-added'>
                            <span>Date Added</span>
                        </div>
                        <div className="opts-menu-section">
                            <button onClick={() => addToLikedPlaylist(currSong)} className={isSongLiked(currSong.id) ? "is-liked-song-preview" : "like-song-preview"}>{isSongLiked(currSong.id) ? <FilledLikeToolBar /> : <UnfilledLikeToolBar />}</button>
                            <div className="song-duration-container">{currSong.songDuration}</div>
                            <button onClick={(ev) => addToPlaylist(ev, currSong)} className="add-to-playlist-btn" ><OptsSvg /></button>
                        </div>
                    </div>
                )}
            </Draggable>
        }
    </>
}