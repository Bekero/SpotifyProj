import React, { useState, useEffect } from "react"
import axios from "axios"
import { GenreList } from './genre-list'
import PlaySong from '../cmps/svg/play-song-svg'
// import { setCurrPlayingUrlFromSearch } from "../store/station.actions"
import { useDispatch, useSelector } from "react-redux"


export function AppSearch() {
  const [data, setData] = useState([])
  const [term, setTerm] = useState([])
  const player = useSelector(state => state.stationModule.player)

  const dispatch = useDispatch()

  useEffect(() => {
    setData([])
    if (term == "" || !term)
      return;
    const search = async () => {
      const results = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyDgbFfLi0LGl6lOJ_0cN4A-lcrS4UtryCU&q=${term}/category=Music&maxResults=10`, {
      })
      setData(results.data.items)
      console.log(results.data.items, 'data')
    }
    search()
  }, [term])

  const playCurrUrl = (url) => {
    console.log(player);
    player.loadVideoById(url)
    // dispatch(setCurrPlayingUrlFromSearch(url))
  }

  const searchResultsMapped = data.map((item) => {
    const { width, height } = item.snippet.thumbnails.high;
    const ratio = height / width;

    const style = {
      width,
      height: width * ratio
    }
    return (
      <div key={item.id.videoId} className="content flex row justify-center align-center">
        <button onClick={() => playCurrUrl(item.id.videoId)}><PlaySong /></button>        <div className="header">{item.snippet.title}</div>
        <img src={item.snippet.thumbnails.high.url} style={style} />
      </div>
    )
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Search Term</label>
          <input
            className="input"
            // value={term}
            onChange={e => setTerm(e.target.value)}
          />
        </div>
      </div>
      {searchResultsMapped}
      <div className="ui celled list"></div>
    </div>
  )
} 