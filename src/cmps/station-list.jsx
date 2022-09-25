import { StationPreview } from "./station-preview";

export function StationList({ stations, user, library }) {
  return (
    <section className='station-list-main-container'>
      <h1>Good afternoon</h1>
      <div className='station-list-container'>
        {stations.map(station => {
          if(library){
            if (station?.createdBy?._id === user?._id) {
              return <StationPreview key={station._id} station={station} />
            }
          } else{
            return <StationPreview key={station._id} station={station} />
          }
        })}
      </div>
    </section>
  )
}
