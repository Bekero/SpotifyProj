import { StationPreview } from "./station-preview";

export function StationList({ stations }) {
  return (
    <section className='station-list-main-container'>
      <h1>Good afternoon</h1>
      <div className='station-list-container'>
        {stations.map((station) => (
          <StationPreview key={station._id} station={station} />
        ))}
      </div>
  </section>
  );
}
