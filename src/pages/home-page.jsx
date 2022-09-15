
import React from 'react'
import { stationService } from '../services/station.service'
import { StationList } from '../cmps/station-list'

export function HomePage() {

    let stations = stationService.getStations()

    return (
        <div className="app-home main-view">
            <h6>Hello from Home Page </h6>
            <StationList stations={stations} />
        </div>
    )

}
