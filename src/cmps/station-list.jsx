import { StationPreview } from "./station-preview";

export function StationList({ stations, user, header }) {

    const path = window.location.pathname
  return (
    <section className='station-list-main-container'>
      {path === '/' && <h1>{header}</h1>}
      <div className={`station-list-container ${path === '/' && 'height overflowY'}`}>
        {stations.map(station => {
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
