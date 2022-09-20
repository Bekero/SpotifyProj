import React, { useState, useEffect } from "react"
import axios from "axios"
import { GenreList } from './genre-list'


export function AppSearch () {
  const [data, setData] = useState([])
  const [term, setTerm] = useState([])

  useEffect(() => {
    setData([])
    if (term == "" || !term )
        return;
      const search = async () => {
          const results  = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyCC2JyYhExFETzFeFJr5tUro3kK1AsTScw&q=${term}&maxResults=50`, {
        })
      setData(results.data.items)
      console.log(results.data.items,'data')
    }
    search()
  }, [term])

  const searchResultsMapped = data.map(item => {
    const {width, height} = item.snippet.thumbnails.high;
    const ratio = height / width;

    const style = {
      width,
      height: width * ratio
    }
    return (
     
        <div className="content">
          <div className="header">{item.snippet.title}</div>
          <img src={item.snippet.thumbnails.high.url} style={style}/>
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