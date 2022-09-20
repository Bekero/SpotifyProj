
import React, { useEffect } from 'react'
import { StationList } from '../cmps/station-list'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadStations } from '../store/station.actions'
import { StationDetails } from './station-details'

export function LikedSongs() {
    const dispatch = useDispatch()
    const stations = useSelector(state => state.stationModule.stations)
    let likedStation = stations.find(station => station.isLikedStation === true)

    console.log('Im Changing')
    useEffect(() => {
        if (stations) return
        dispatch(loadStations())
    }, [])

    if (!stations) return
    return (
        <div className="liked-station-container">
            <ol>
                <StationDetails likedStation={likedStation} />
            </ol>
        </div>
    )
}