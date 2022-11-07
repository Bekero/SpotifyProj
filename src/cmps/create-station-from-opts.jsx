
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { stationService } from '../services/station.service'
import { addStation, setCurrStation } from '../store/station.actions'
import { useDispatch } from 'react-redux'

export function CreateStationFromOpts() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onCreateStation = async () => {
        const station = stationService.getEmptyStation()
        console.log('station', station);
        const savedStation = await dispatch(addStation(station))
        navigate(`/playlist/${savedStation._id}`)
        // dispatch(setCurrStation(savedStation._id))
    }

    return <div>
        <div onClick={onCreateStation}>Create Playlist</div>
    </div>

    {/* Create a new ID Playlist  navigate(/playlist/:id) */ }
}
