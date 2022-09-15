
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { stationService } from '../services/station.service'

export const StationDetails = () => {
    const params = useParams()
    const [station, setStation] = useState(null)

    useEffect(() => {
        loadStation()
        console.log('Hey')
    }, [])


    const loadStation = () => {
        const stationId = params.stationId
        stationService.getById(stationId)
            .then(station => console.log('station :', station))
        console.log('stationId :', stationId)
    }

    return (
        <div>
            <h2>Hello from Station Details</h2>
        </div>
    )
}