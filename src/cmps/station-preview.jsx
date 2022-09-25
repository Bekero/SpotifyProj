
import { Link } from "react-router-dom";
import NewPlaylistPreviewSvg from "./svg/new-playlist-preview-svg";

export function StationPreview({ station }) {
    const getLabels = () => {
        return station.tags.join(', ')
    }

    return (
        <Link className="text-decoration" to={`/playlist/${station._id}`}>
            <div className="station-preview">
                <div className="img-details-container">
                    {!station?.createdBy?.imgUrl ? <div> <NewPlaylistPreviewSvg /> </div> :
                        <img className="img-details" src={station?.createdBy?.imgUrl} />}
                </div>
                <div className="station-preview-artist">
                    <div className="station-preview-label">{getLabels()}</div>
                    <div className="station-preview-artist-name">{station?.name}</div>
                </div>
            </div>
        </Link>
    )
}