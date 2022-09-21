
import { Link } from "react-router-dom";

export function StationPreview({ station }) {
    console.log(station);
    const getLables = () => {
        return station.tags.join(', ')
    }
    return (
        <Link className="text-decoration" to={`/playlist/${station._id}`}>
            <div className="station-preview">
                <img className="img-details" src={`https://robohash.org/${station.name}?set=set5`} />
                <div className="station-preview-artist">
                    <div className="station-preview-lable">{getLables()}</div>
                    <div className="station-preview-artist-name">{station.name}</div>
                </div>
            </div>
        </Link>
    )
}

{/* <div className="station-details">
<h3>Name: {station.name}</h3>
<h3>Created By: {station.createdBy.fullname}</h3>
<ul>
    {station.songs.map(song => <li key={song.id}>{song.title}</li>)}
</ul>
<img className="img-details" src={`https://robohash.org/${station._id}?set=set4`} alt="" />
<button onClick={onBack}>Back to Stations App</button>
{/* <Link to={`/station/edit/${station._id}`}><button>Edit</button></Link> */}

// </div> */}