
import React, { useEffect } from 'react'
import { stationService } from '../services/station.service'
import { StationList } from '../cmps/station-list'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// import { loadStations, removeStation } from '../store/station.actions'

export function HomePage() {

    // const stations = useSelector(state => state.stationModule.stations)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(loadStations())
    // }, [])

    let stations = stationService.getStations()

    return (
        <div className="app-home main-view">
            <h6>Hello from Home Page </h6>
            <StationList stations={stations} />
        </div>
    )

}
