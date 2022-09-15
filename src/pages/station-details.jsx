
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
    }, [])


    const loadStation = () => {
        const stationId = params.stationId
        stationService.getById(stationId)
            .then(station => setStation(station))
    }

    const onBack = () => {
        navigate('/')
    }

    if (!station) return <div>Loading...</div>
    console.log(station);
    return (
        <div className='station-details'>
            <h3>Name: {station.name}</h3>
            <h3>Created By: {station.createdBy.fullname}</h3>
            <ul>
                {station.songs.map(song => <li key={song.id}>{song.title}</li>)}
            </ul>
            <img src={`https://robohash.org/${station._id}?set=set4`} alt="" />
            <button onClick={onBack}>Back to Stations App</button>
            {/* <Link to={`/station/edit/${station._id}`}><button>Edit</button></Link> */}

        </div>
    )
}