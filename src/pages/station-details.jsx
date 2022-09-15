
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { stationService } from '../services/station.service'

export const StationDetails = () => {
    const params = useParams()
    const [station, setStation] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadStation()
    }, [params.stationId])


    const loadStation = () => {
        const stationId = params.stationId
        stationService.getById(stationId)
            .then(station => setStation(station))
    }

    const onBack = () => {
        navigate('/')
    }

    if (!station) return <div>Loading...</div>
    return (
        <div className="station-details">
            <div className="img-container">
                <img className="img-details" src={`https://robohash.org/${station._id}?set=set4`} alt="" />
            </div>
            <div className="details-container">
                <h3>{station.name}</h3>
                <h3>{station.createdBy.fullname}</h3>
                <ul>
                    {station.songs.map(song => <li key={song.id}>{song.title}</li>)}
                </ul>
                {/* <button onClick={onBack}>Back to Stations App</button> */}
                {/* <Link to={`/station/edit/${station._id}`}><button>Edit</button></Link> */}
            </div>
        </div>
    )
}