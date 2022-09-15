
import React from 'react'
import { useNavigate } from 'react-router-dom'

// import { NavLink } from "react-router-dom";

export function CreateStation() {

    const navigate = useNavigate()

    const onCreateStation = () => {
        console.log('Creating!!!')
        navigate('/playlist/:id')
    }

    return <div className="create-station">
        <button className="create-station-btn" onClick={onCreateStation}>Create Playlist</button>
    </div>

    {/* Create a new ID Playlist  navigate(/playlist/:id) */ }
}
