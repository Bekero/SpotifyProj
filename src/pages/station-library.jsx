
import React, { useEffect } from 'react'
import { StationList } from '../cmps/station-list'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadStations, removeStation } from '../store/station.actions'

export function StationLibrary() {
    let stations = useSelector(state => state.stationModule.stations)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('Hey');
        dispatch(loadStations())

    }, [])
    console.log('stations from library', stations);
    stations = stations.filter(station => station.isMyStation === true)
    console.log('My Playlists after filter', stations);
    if (!stations || !stations.length) return <div>Loading...</div>
    return (
        <div className="app-home main-view">
            <h6>Hello from Station Library </h6>
            <StationList stations={stations} />
        </div>
    )

}
