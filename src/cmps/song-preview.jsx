import FilledLikeToolBar from "./svg/filled-like-tool-bar"
import UnfilledLikeToolBar from "./svg/unfilled-like-tool-bar"
import OptsSvg from './svg/opts-song'
import PlaySong from '../cmps/svg/play-song-svg'
import { userService } from "../services/user.service"
import { useSelector } from "react-redux"

export function SongPreview({ station, playHover, onSongHover, playCurrUrl, addToLikedPlaylist, currSongIdx, addToPlaylist, user }) {

    function isSongLiked(songId) {
        if (!user) return false
        return user?.likedSongs?.some(song => song.id === songId)
    }


    return <>
        {station.songs.map((song, songIdx) => {
            return <div onMouseOver={() => onSongHover(true, songIdx)} onMouseLeave={() => onSongHover(false, songIdx)} key={song.id} className="song-preview">
                <div className="song-number-play">
                    {(playHover && (currSongIdx === songIdx)) ?
                        <div className="play-song-preview"><button onClick={() => playCurrUrl(songIdx, station._id)}>{<PlaySong />}</button></div> : <div>{songIdx + 1}</div>}
                </div>
                <div className='song-list-title-container'>
                    <div className="song-list-title-img-container">
                        <img className="song-img" src={`${song.imgUrl}`} />
                    </div>
                    <div className='song-list-title'>
                        <div className="song-title">{song.title}</div>
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
                    <button onClick={() => addToLikedPlaylist(song)} className={isSongLiked(song.id) ? "is-liked-song-preview" : "like-song-preview"}>{isSongLiked(song.id) ? <FilledLikeToolBar /> : <UnfilledLikeToolBar />}</button>
                    <div className="song-duration-container">{song.songDuration}</div>
                    <button onClick={(ev) => addToPlaylist(ev, song)} className="add-to-playlist-btn" ><OptsSvg /></button>
                </div>
            </div>
        })}    </>
}