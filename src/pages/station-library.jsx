
import React, { useEffect } from 'react'
import { StationList } from '../cmps/station-list'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadStations } from '../store/station.actions'

export function StationLibrary() {
    let stations = useSelector(state => state.stationModule.stations)
    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStations())
    }, [])

    stations = stations.filter(station => station?.createdBy?._id === user?._id)
    if (!stations.length) return <div>You have no playlists...</div>
    if (!stations) return <div>Loading...</div>
    return (
        <div className="app-home main-view">
            {/* <h6>Hello from Station Library </h6> */}
            <StationList stations={stations} user={user} />
        </div>
    )

}
