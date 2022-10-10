import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { SongList } from "./song-list";
import { StationPreview } from "./station-preview";



export function StationList({ stations, user, header, title }) {

  const navigate = useNavigate();

  const setAllStationCategory = ({ header }) => {
    navigate(`/genre/${header}`);
  }


  const path = window.location.pathname

  return (
    <section className='station-list-main-container'>
      {path === '/' && <div className="see-all-station-list">
        <div onClick={() => setAllStationCategory({ header })}>{title}</div>
        <span onClick={() => setAllStationCategory({ header })}>See All</span>

      </div>}
      <div className={`station-list-container ${path === '/' && 'height overflowY'}`}>
        {stations?.map(station => {
          if (path === '/collection/playlist') {
            if (station?.createdBy?._id === user?._id) {
              return <StationPreview key={station._id} station={station} />
            }
          } else {
            return <StationPreview key={station._id} station={station} />
          }
        })}
      </div>
    </section >
  )
}
