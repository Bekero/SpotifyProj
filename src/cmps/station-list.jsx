import { StationPreview } from "./station-preview";

export function StationList({ stations }) {

    console.log('From Station List :', stations)

    return (
        <div>
            <h6>Hello from station list</h6>
            <div>
                {stations.map(station => <StationPreview key={station._id} station={station} />)}
            </div>

        </div>
    )
}