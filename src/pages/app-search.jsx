import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SearchList } from "../cmps/search-list";
import { youtubeService } from "../services/youtube.service";
import { addLikedSong } from "../store/user.actions";
import { loadStations, setCurrentUrl } from "../store/station.actions"
import { stationService } from "../services/station.service";
import { StationList } from "../cmps/station-list";


export function AppSearch() {

  // const player = useSelector(state => state.songModule.player);
  const [stations, setStations] = useState(null)

  const dispatch = useDispatch()
  const [data, setData] = useState([]);
  const [songDetails, setSongDetails] = useState([]);
  const [term, setTerm] = useState([]);
  let results
  useEffect(() => {
    console.log('term', term);
    if (term === '' || !term.length) return;
    search()
  }, [term, results]);

  const search = async () => {
    results = await youtubeService.getSongs(term)
    await setData(results.data.items);
    if (!data.length) return console.log('asdkhnjaskdygasdkhjasdajkshdjkashd');
    const details = await youtubeService.getSongsDetails(data)
    if (!details) return
    setSongDetails(details.data.items)
    loadStations(term)
  };
  const loadStations = async (filterBy) => {
    try {
      let filteredStations = await stationService.query(filterBy)
      console.log('asdasdasdasd');
      setStations(filteredStations)
    } catch (err) {
      console.log('Cannot get stations :', err)
    }
  }
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
    const currSong = {
      url: song.id.videoId,
      imgUrl: song.snippet.thumbnails.default,
      title: song.snippet.title
    }
    const station = { title: 'Falling stars', songs: [currSong] }
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
      {stations && <StationList stations={stations} />}
    </div>
  );
}
