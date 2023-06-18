
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StationPreview } from "./station-preview";

export function StationList({ stations, user, header, title }) {

  const navigate = useNavigate();
  const [homePath, setHomePath] = useState(null)

  const setAllStationCategory = ({ header }) => {
    navigate(`/genre/${header}`);
  }
  const path = window.location.pathname
  const params = useParams()

  useEffect(() => {
    console.log('path :', path)
    if (params.genre || path === '/collection/playlist') {
      setHomePath(false)
    } else {
      setHomePath(true)
    }
    console.log('homePath :', homePath)
  }, [])


  return (
    <section className='station-list-main-container'>
      {path === '/' && <div className="see-all-station-list">
        <div onClick={() => setAllStationCategory({ header })}>{title}</div>
        <span onClick={() => setAllStationCategory({ header })}>See All</span>

      </div>}
      {/* path === '/' &&  */}
      <div className={`station-list-container ${path === '/collection/playlist' && 'flex column align-center'} ${homePath ? 'height overflowY' : 'fdc-aic-pd'}`}>
        {stations?.map(station => {
          if (path === '/collection/playlist') {
            if (station?.createdBy?._id === user?._id) {
              return <StationPreview path={path} key={station._id} station={station} />
            }
          } else {
            return <StationPreview key={station._id} station={station} />
          }
        })}
      </div>
    </section >
  )
}
