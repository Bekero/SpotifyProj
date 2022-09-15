
import React from 'react'
import { useNavigate } from 'react-router-dom'
// import { stationService } from '../services/my.station.service'
import { stationService } from '../services/station.service'
import { addStation } from '../store/station.actions'

// import { NavLink } from "react-router-dom";

export function CreateStation() {

    const navigate = useNavigate()

    const onCreateStation = () => {
        console.log('Creating!!!')
        const station = stationService.getEmptyStation()
        // addStation(station)
        stationService.save({...station}).then((station) => navigate(`/playlist/${station._id}`))
        
    }

    return <div className="create-station">
        <button className="create-station-btn" onClick={onCreateStation}>Create Playlist</button>
    </div>

    {/* Create a new ID Playlist  navigate(/playlist/:id) */ }
}
