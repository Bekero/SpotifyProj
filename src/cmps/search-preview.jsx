import { useDispatch } from "react-redux";
import PlaySong from "./svg/play-song-svg";
// import { setCurrPlayingUrlFromSearch } from "../store/station.actions";

export function SearchPreview({ song, playCurrUrl, addToLikedPlaylist }) {
  console.log(song);
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
          
        <div className='play-song-title'>{song.snippet.title}</div>
        <div className="play-song-author">{song.snippet.channelTitle}</div>
        </div>
      </div>
      <div className="play-song-tool-bar-search"> 
      <button onClick={() => addToLikedPlaylist(song)}>Like</button>
      <div className="play-song-search-duration">03:02</div>
      <button>...</button>
      </div>
    </div>
  );
}
