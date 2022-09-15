
import { Link } from "react-router-dom";

export function StationPreview({ station }) {

    return (
        <Link to={`/playlist/${station._id}`}>
            <div className="station-preview">
            <img className="img-details" src={`https://robohash.org/${station.name}?set=set5`}/>

                <h6>{station.name}</h6>
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