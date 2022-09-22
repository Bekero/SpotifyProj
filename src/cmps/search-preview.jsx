import { useDispatch } from "react-redux";
import PlaySong from "./svg/play-song-svg";
// import { setCurrPlayingUrlFromSearch } from "../store/station.actions";
import UnfilledLikeToolBar from "./svg/unfilled-like-tool-bar"
import FilledLikeToolBar from "./svg/filled-like-tool-bar"


export function SearchPreview({ song, playCurrUrl, addToLikedPlaylist }) {

 const songTitle = song.snippet.title.replace(/(\(.*?\))/g, '')
 function isSongLiked(songId) {
  return (song => song.id === songId)
}


  return (
    <div key={song.id.videoId} className='search-list-preview'>
        <div className="flex align-center">
      <div className='play-song-btn-container'>
          <img src={song.snippet.thumbnails.high.url} />
          <button
            className='play-song-btn'
            onClick={() => playCurrUrl(song)}
          >
            <PlaySong />
          </button>
        </div>
        <div className="play-song-desc">
          
        <div className='play-song-title'>{songTitle}</div>
        <div className="play-song-author">{song.snippet.channelTitle}</div>
        </div>
      </div>
      <div className="play-song-tool-bar-search"> 
      <button onClick={() => addToLikedPlaylist(song)} className={isSongLiked(song.id) ? "is-liked-song-preview" : "like-song-preview"}>{isSongLiked(song.id) ? <FilledLikeToolBar /> : <UnfilledLikeToolBar />}</button>
      <div className="play-song-search-duration">03:02</div>
      <button>...</button>
      </div>
    </div>
  );
}
