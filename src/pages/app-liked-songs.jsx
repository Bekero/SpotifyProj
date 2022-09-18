
import React, { useEffect } from 'react'
import { StationList } from '../cmps/station-list'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadStations } from '../store/station.actions'

export async function LikedSongs() {

    let stations = useSelector(state => state.stationModule.stations)
    let likedStation = stations.filter(station => station.isLikedStation === true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStations())
    }, [])

    if (!likedStation[0].songs.length) return <div>You have no songs yet...</div>

    return (
        <div className="liked-station-container">
            <ol>
                Nada
                {/* {<SongList likedStation={likedStation}/>} */}
            </ol>
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

