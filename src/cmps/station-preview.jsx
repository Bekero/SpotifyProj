
import { Link } from "react-router-dom";

export function StationPreview({ station }) {


    return (
        <Link to={`/playlist/${station._id}`}>
            <div className="station-preview">
                <h4>Artist Name: {station.name}</h4>
            </div>
        </Link>
    )
}