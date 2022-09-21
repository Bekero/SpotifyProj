import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { SearchList } from '../cmps/search-list'
import { youtubeService } from '../services/youtube.service'
import { setCurrentUrl } from "../store/station.actions"


export function AppSearch() {
  const player = useSelector(state => state.stationModule.player)
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [term, setTerm] = useState([])

  useEffect(() => {
    if (term == "" || !term)
      return;
    const search = async () => {
      const results = await youtubeService.getSongs(term)
      setData(results.data.items)
    }
    search()
  }, [term])

  const playCurrUrl = (url) => {
    console.log(player);
    dispatch(setCurrentUrl(url))
    // player.loadVideoById(url)
  }

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Search Term</label>
          <input
            className="input"
            onChange={e => setTerm(e.target.value)} />
        </div>
      </div>
      <div className="songList">
        <SearchList playCurrUrl={playCurrUrl} data={data} />
      </div>
      <div className="ui celled list"></div>
    </div>
  )
} 