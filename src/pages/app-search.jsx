import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SearchList } from "../cmps/search-list";
import { youtubeService } from "../services/youtube.service";
import { addLikedSong } from "../store/user.actions";
import { setCurrentUrl } from "../store/station.actions"


export function AppSearch() {
  const player = useSelector((state) => state.stationModule.player);
  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [term, setTerm] = useState([]);

  useEffect(() => {
    if (term == "" || !term) return;
    const search = async () => {
      const results = await youtubeService.getSongs(term);
      setData(results.data.items);
    };
    search();
  }, [term]);

  const addToLikedPlaylist = async (song) => {
    const filteredSong = {
      id: song.id.videoId,
      imgUrl: song.snippet.thumbnails.default,
      title: song.snippet.title
    }
    console.log(filteredSong);
    // dispatch(addLikedSong(song))
  }

  const playCurrUrl = (song) => {
    console.log(player);
    const currSong = {
      url: song.id.videoId,
      imgUrl: song.snippet.thumbnails.default,
      title: song.snippet.title
    }
    const station = { title: 'Barak and Tommy The GEVERS', songs: [currSong] }
    dispatch({ type: 'SET_CURR_STATION', station })
    dispatch({ type: 'SET_CURRENTLY_PLAYING_SONG_IDX', songIdx: 0 })
  }

  return (
    <div>
      <div className='ui form'>
        <div className='field'>
          <label>Search Term</label>
          <input className='input' onChange={(e) => setTerm(e.target.value)} />
        </div>
      </div>

      <SearchList addToLikedPlaylist={addToLikedPlaylist} playCurrUrl={playCurrUrl} data={data} />

      <div className='ui celled list'></div>
    </div>
  );
}