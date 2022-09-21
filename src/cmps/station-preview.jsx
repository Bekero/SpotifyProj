
import { Link } from "react-router-dom";

export function StationPreview({ station }) {
    console.log(station);
    const getLabels = () => {
        return station.tags.join(', ')
    }
    console.log(station);
    return (
        <Link className="text-decoration" to={`/playlist/${station._id}`}>
            <div className="station-preview">
                <img className="img-details" src={station.createdBy.imgUrl} />
                <div className="station-preview-artist">
                    <div className="station-preview-label">{getLabels()}</div>
                    <div className="station-preview-artist-name">{station.name}</div>
                </div>
            </div>
        </Link>
    )
}