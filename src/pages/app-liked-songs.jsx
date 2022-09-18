
import React, { useEffect } from 'react'
import { StationList } from '../cmps/station-list'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadStations } from '../store/station.actions'

export function LikedSongs() {

    let likedSongs = useSelector(state => state.stationModule.likedSongsStation)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadStations())
    }, [])
    if (!likedSongs) return <div>You have no playlists...</div>

    return (
        <div className="liked-station-container">
            {/* <h2> Hello From Like Page </h2> */}
        </div>
    )
}




    // stations = stations.filter(station => station.isMyStation === true)
    // console.log('My Playlists after filter', stations);
    // return (
    //     <div className="app-home main-view">
    //         <h6>Hello from Station Library </h6>
    //         <StationList stations={stations} />
    //     </div>
    // )

