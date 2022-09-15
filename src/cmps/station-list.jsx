import { StationPreview } from "./station-preview";

export function StationList({ stations }) {


    return (
        <section className="station-list-main-container">
            <h6>Hello from station list</h6>
            <div className="station-list-container">
                {stations.map(station => <StationPreview key={station._id} station={station} />)}
            </div>

        </section>
    )
}