import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SearchList } from "../cmps/search-list";
import { youtubeService } from "../services/youtube.service";
import { stationService } from "../services/station.service";
import { StationList } from "../cmps/station-list";
import { useDebounce } from "../cmps/use-debounce"

export function AppSearch() {

  // const player = useSelector(state => state.songModule.player);
  const [stations, setStations] = useState(null)

  const dispatch = useDispatch()
  // const [data, setData] = useState([]);
  const [songDetails, setSongDetails] = useState([]);
  const [songDuration, setSongDuration] = useState([]);
  const [term, setTerm] = useState([]);
  const DebounceSearch = useDebounce(term, 600)
  // const [results,setResults] =useState(null)


  useEffect(() => {
    if (DebounceSearch === '' || !DebounceSearch.length) return setSongDetails([])
    search()
  }, [DebounceSearch]);

  // songsDetails = songsDetails.replace(/[^0-9]/, ':');


  const search = async () => {
    loadStations(DebounceSearch)
    const results = await youtubeService.getSongs(DebounceSearch)
    getSongsData(results.data.items)
  }

  const getSongsData = async (data) => {
    const details = await youtubeService.getSongsDetails(data)
    if (!details) return
    console.log(details);
    const durations = youtubeService.getSongsDuration(details)
    console.log('durations', durations);
    setSongDuration(durations)
    setSongDetails(details)
  }

  const loadStations = async (filterBy) => {
    try {
      let filteredStations = await stationService.query(filterBy)
      setStations(filteredStations)
    } catch (err) {
      console.log('Cannot get stations :', err)
    }
  }
  const addToLikedPlaylist = async (song) => {
    // const filteredSong = {
    //   id: song.id.videoId,
    //   imgUrl: song.snippet.thumbnails.default,
    //   title: song.snippet.title
    // }
    // dispatch(addLikedSong(song))
  }
  // const addToLikedPlaylist = (wantedSong) => {
  //   if (!user) {
  //     dispatch(addLikedSong(wantedSong))
  //     return
  //   }
  //   else {
  //     let isSongExists = user.likedSongs?.find(song => song.id === wantedSong.id)
  //     if (isSongExists) dispatch(removeLikedSong(wantedSong))
  //     else if (!isSongExists) dispatch(addLikedSong(wantedSong))
  //     return
  //   }
  // }
  const playCurrUrl = (song) => {
    const { contentDetails: { imgUrl, title }, id } = song;
    const currSong = {
      url: id,
      imgUrl,
      title
    }
    const station = { title: 'Falling stars', songs: [currSong] }
    dispatch({ type: 'SET_CURR_STATION', station })
    dispatch({ type: 'SET_CURRENTLY_PLAYING_SONG_IDX', songIdx: 0 })
  }
  return (
    <div className="main-search-container">
      <div className='search-field'>
        <input className='search-input' placeholder="What do you want to listen to?" onChange={(ev) => setTerm(ev.target.value)}
        />
      </div>

      <SearchList addToLikedPlaylist={addToLikedPlaylist} playCurrUrl={playCurrUrl} songDetails={songDetails} songDuration={songDuration} />

      <div className='ui celled list'></div>
      {stations && <StationList stations={stations} />}
    </div>
  );
}
