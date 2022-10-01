import { useState } from "react";
import { StationList } from "./station-list";
import genreStation from '../data/genre.json'
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function StationListContainer() {
  useEffect(() => {
  }, []);

  return (
    <section className='genre-list-main-container'>
      <h1 className="browse-all">Browse all</h1>
        {genreStation.map(genre => {
          return <Link
            key={genre._id}
            className="text-decoration"
            to={`/genre/${genre.genre}`}>
            <div style={{ backgroundColor: genre.color }} className="genre-preview">
              <img src={genre.genreImg}/>
              <span>{genre.genre}</span>
            </div></Link>
        })}
    </section>
  )
}
