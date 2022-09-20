import React, { useState, useEffect } from "react"
import { SearchList } from '../cmps/search-list'
import {youtubeService} from '../services/youtube.service'


export function AppSearch() {
  const [data, setData] = useState([])
  const [term, setTerm] = useState([])


console.log(youtubeService.getSongs(),)
  useEffect(() => {
    if (term == "" || !term)
      return;
      const search = async () => {
      const results = await  youtubeService.getSongs(term)
      setData(results.data.items)
      console.log(results.data.items, 'data')
      console.log(term,term)
    }
    search()
  }, [term])

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Search Term</label>
          <input
            className="input"
            onChange={e => setTerm(e.target.value)}/>
        </div>
      </div>
      <div className="songList">
      <SearchList data={data}/>
      </div>
      <div className="ui celled list"></div>
    </div>
  )
} 