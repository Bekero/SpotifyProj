import PlaySong from "./svg/play-song-svg";
import UnfilledLikeToolBar from "./svg/unfilled-like-tool-bar"
import FilledLikeToolBar from "./svg/filled-like-tool-bar"
import OptsSvg from './svg/opts-song'
import { utilService } from "../services/util.service";

export function SearchPreview({ songDuration, addSongToPlaylist, song, playCurrUrl, addToLikedPlaylist, user }) {

  const songTitle = song.contentDetails.title.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
  const path = window.location.pathname
  function isSongLiked(songId) {
    if (!user) return false
    return user.likedSongs?.some(song => song.id === songId)
  }

  return (
    <div key={song.id} className='search-list-preview'>
      <div className="left flex align-center">
        <div className='play-song-btn-container'>
          <img src={song?.contentDetails?.imgUrl} alt="" />
          <button
            className='play-song-btn'
            onClick={() => playCurrUrl(song)}
          >
            <PlaySong />
          </button>
        </div>
        <div className="play-song-desc">
          <div className='play-song-title'>{songTitle.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>;\{\}\[\]\\\/]/gi, '')}</div>
          <div className="play-song-author">{song.contentDetails.channelTitle}</div>
        </div>
      </div>
      {path === '/search' ? <div className="opts-menu-section">
        <button onClick={() => addToLikedPlaylist(song)} className={isSongLiked(song.id) ? "is-liked-song-preview" : "like-song-preview"}>{isSongLiked(song.id) ? <FilledLikeToolBar /> : <UnfilledLikeToolBar />}</button>
        <div className="song-duration-container">{utilService.setTimestampToTime(songDuration)}</div>
        {/* <button onClick={(ev) => addSongToPlaylist(ev, song)} className="add1-to-playlist-btn" >Add</button> */}
      </div> :
        <div className="flex align-center justify-center">
          <button onClick={(ev) => addSongToPlaylist(ev, song)} className="add1-to-playlist-btn" >Add</button>
        </div>
      }
    </div>
  )
}
