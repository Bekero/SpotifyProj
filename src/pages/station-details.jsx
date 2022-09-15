
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { stationService } from '../services/station.service'
import { removeStation } from '../store/station.actions'

export const StationDetails = () => {
    const params = useParams()
    const [station, setStation] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadStation()
    }, [params.stationId])

    const onRemoveStation = (stationId) => {
        // ev.stopPropagation()
        dispatch(removeStation(stationId))
        navigate('/collection/playlist')
    }
    
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
                <img className="img-details" src={station.createdBy.imgUrl} alt="" />
                {/* <img className="img-details" src={`https://robohash.org/${station._id}?set=set4`} alt="" /> */}
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
            {station.isMyStation && <button onClick={(ev) => onRemoveStation(station._id, ev)}>Delete</button>}
        </div>
    )
}