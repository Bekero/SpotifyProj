
import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { stationService } from '../services/my.station.service'
import { stationService } from '../services/station.service'
import { addStation, setCurrStation } from '../store/station.actions'
import CreateStationSvg from '../cmps/svg/create-playlist'
import { useDispatch } from 'react-redux'
// import { NavLink } from "react-router-dom";

export function CreateStation() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onCreateStation = async () => {
        const station = stationService.getEmptyStation()
        const savedStation = await dispatch(addStation(station))
        navigate(`/playlist/${savedStation._id}`)
        // dispatch(setCurrStation(savedStation._id))
    }

    return <div className="create-station">
        <button className="create-station-btn" onClick={onCreateStation}>
            <div className='create-station-icon'><CreateStationSvg /></div>Create Playlist</button>
    </div>

    {/* Create a new ID Playlist  navigate(/playlist/:id) */ }
}
