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

export function AppSearch({ station, addSongToPlaylist }) {

  const [stations, setStations] = useState(null)
  const path = window.location.pathname
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.stationModule.isLoading)
  const [songDetails, setSongDetails] = useState([]);
  const [songDuration, setSongDuration] = useState([]);
  const [term, setTerm] = useState([]);
  const DebounceSearch = useDebounce(term, 600)
  const user = useSelector(state => state.userModule.user)

  useEffect(() => {
    if (DebounceSearch === '' || !DebounceSearch.length) return setSongDetails([])
    search()
  }, [DebounceSearch]);

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
      setIsLoading(true)
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

  const setIsLoading = (diff) => {
    dispatch({ type: 'SET_LOADING', diff })
  }

  return (
    <div className="main-search-container">
      <div className='search-field'>
        <input className='search-input' placeholder="What do you want to listen to?" onChange={(ev) => setTerm(ev.target.value)} />
      </div>
      {/* {!stations && isLoading && <div className="loading"><img src="https://media0.giphy.com/media/XD4AGF33DE3ADaucqt/giphy.gif?cid=ecf05e47hcj0piy50kbuangxxxzibzc9tkaorh1irjn4fqpu&rid=giphy.gif&ct=s"/></div>} */}
      <SearchList setIsLoading={setIsLoading} addSongToPlaylist={addSongToPlaylist} addToLikedPlaylist={addToLikedPlaylist} playCurrUrl={playCurrUrl} songDetails={songDetails} songDuration={songDuration} user={user} />
      {/* {path === '/collection/tags' && <StationList stations={stations} />} */}
      {stations && <StationList stations={stations} />}
      {path === '/search' && <StationListContainer />}
    </div>
  );
}