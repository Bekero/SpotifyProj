import { useDispatch } from "react-redux";
import PlaySong from "./svg/play-song-svg";
import { setCurrPlayingUrlFromSearch } from "../store/station.actions";

export function SearchPreview({ song }) {
  const dispatch = useDispatch();

  const playCurrUrl = (url) => {
    dispatch(setCurrPlayingUrlFromSearch(url));
  };

  return (
    <div
      key={song.id.videoId}
      className='content flex row justify-center align-center'
    >
      <div className='play-song-btn'>
        <button onClick={() => playCurrUrl(song.id.videoId)}>
          <PlaySong />
        </button>
        <img src={song.snippet.thumbnails.high.url} />
      </div>
      <div className='header'>{song.snippet.title}</div>

    </div>
  );
}
