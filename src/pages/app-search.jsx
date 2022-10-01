import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SearchList } from "../cmps/search-list";
import { youtubeService } from "../services/youtube.service";
import { stationService } from "../services/station.service";
import { StationList } from "../cmps/station-list";
import { useDebounce } from "../cmps/use-debounce"
import { systemReducer } from "../store/system.reducer"

import { StationListContainer } from "../cmps/station-list-container";
import { addSongToMyPlaylist } from "../store/station.actions";
import { utilService } from "../services/util.service";
import { addLikedSong, removeLikedSong } from "../store/user.actions";

export function AppSearch({ addSongToPlaylist }) {

  // const player = useSelector(state => state.songModule.player);
  const [stations, setStations] = useState(null)
  const path = window.location.pathname

  const dispatch = useDispatch()
  // const [data, setData] = useState([]);
  const [songDetails, setSongDetails] = useState([]);
  const [songDuration, setSongDuration] = useState([]);
  const [term, setTerm] = useState([]);
  const DebounceSearch = useDebounce(term, 600)
  const [loading, setLoading] = useState(false)
  const user = useSelector(state => state.userModule.user)
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
    const durations = youtubeService.getSongsDuration(details)
    setSongDuration(durations)
    setSongDetails(details)
  }



  const addToLikedPlaylist = async (song) => {
    const filteredSong = {
      id: song.id,
      url: song.id,
      imgUrl: song.contentDetails.imgUrl,
      title: song.contentDetails.title.replace(/(\(.*?\))/g, ''),
      songDuration: youtubeService.getSongDuration(song.contentDetails.duration),
      addedAt: Date.now()
    }
    console.log(filteredSong);
    if (!user) {
      dispatch(addLikedSong(filteredSong))
      return
    }
    else {
      let isSongExists = user.likedSongs?.find(song => song.id === filteredSong.id)
      console.log('isSongExists', isSongExists);
      if (isSongExists) dispatch(removeLikedSong(filteredSong))
      else if (!isSongExists) dispatch(addLikedSong(filteredSong))
      return
    }
  }

  const loadStations = async (filterBy) => {
    try {
      await utilService.delay(600)
      let filteredStations = await stationService.query(filterBy)
      setStations(filteredStations)
    } catch (err) {
      console.log('Cannot get stations :', err)
    }
  }
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
      <SearchList addSongToPlaylist={addSongToPlaylist} addToLikedPlaylist={addToLikedPlaylist} playCurrUrl={playCurrUrl} songDetails={songDetails} songDuration={songDuration} user={user} />
      {/* <div className='ui celled list'></div> */}
      <></>
      {stations && <StationList stations={stations} />}
      {path === '/search' && <StationListContainer />}
    </div>
  );
}
