import { useDispatch } from "react-redux";
import PlaySong from "./svg/play-song-svg";
// import { setCurrPlayingUrlFromSearch } from "../store/station.actions";
import UnfilledLikeToolBar from "./svg/unfilled-like-tool-bar"
import FilledLikeToolBar from "./svg/filled-like-tool-bar"
import OptsSvg from './svg/opts-song'
import { utilService } from "../services/util.service";

export function SearchPreview({ songDuration, songDetails, song, playCurrUrl, addToLikedPlaylist }) {
  const songTitle = song.contentDetails.title.replace(/(\(.*?\))/g, '')
  function isSongLiked(songId) {
    return (song => song.id === songId.videoId)
  }


  return (
    <div key={song.id} className='search-list-preview'>
      <div className="left flex align-center">
        <div className='play-song-btn-container'>
          <img src={song.contentDetails.imgUrl} />
          <button
            className='play-song-btn'
            onClick={() => playCurrUrl(song)}
          >
            <PlaySong />
          </button>
        </div>
        <div className="play-song-desc">

          <div className='play-song-title'>{songTitle}</div>
          <div className="play-song-author">{song.contentDetails.channelTitle}</div>
        </div>
      </div>
      <div className="opts-menu-section">
        <button onClick={() => addToLikedPlaylist(song)} className={!isSongLiked(song.id) ? "is-liked-song-preview" : "like-song-preview"}>{isSongLiked(song.id) ? <FilledLikeToolBar /> : <UnfilledLikeToolBar />}</button>
        {/* <div className="song-duration-container">0{utilService.getRandomIntInclusive(2, 4)}:{utilService.getRandomIntInclusive(10, 59)}</div> */}
        <div className="song-duration-container">{utilService.setTimestampToTime(songDuration)}</div>
        <button className="add-to-playlist-btn" ><OptsSvg /></button>
        {/* <button onClick={(ev) => addToPlaylist(ev, song)} className="add-to-playlist-btn" ><OptsSvg /></button> */}
      </div>
    </div>
  )
}
