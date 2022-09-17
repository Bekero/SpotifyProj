import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist, addUpdatedLikedStation, addStation } from '../store/station.actions'
import songMenu from '../assets/img/opts-song-list.png'
import { myStationService } from '../services/my.station.service'

export const SongList = ({ station, playCurrUrl }) => {

    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [modalPos, setModalPos] = useState(null)
    // const [onMouseOverAddToPlaylist, setOnMouseOverAddToPlaylist] = useState(null)

    const dispatch = useDispatch()
    let stations = useSelector(state => state.stationModule.stations)
    let likedStationExist = useSelector(state => state.stationModule.likedSongsStation)

    // let currPlayingSongUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    let myStations = stations.filter(station => station.isMyStation === true)

    useEffect(() => {
        dispatch(loadStations())
    }, [])

    const addToPlaylist = (ev, song) => {
        let posX = ev.pageX - ev.view.innerWidth
        let posY = ev.pageY - 100
        let mousePos = { posX, posY }
        setModalPos(mousePos)
        setWantedSong(song)
        setOpenModal(true)
    }

    const addToLikedPlaylist = async (song) => {
        song.isLiked = !song.isLiked
        let likedStation = stations.filter(station => station.isLikedStation === true)
        const newLikedStation = likedStation.length ? likedStation[0] : myStationService.getEmptyLikedSongsStation()
        dispatch(addStation(newLikedStation))
        dispatch(addUpdatedLikedStation(song))
    }

    const onAddToMyPlaylist = (myPlaylistIdx) => {
        setOpenModal(false)
        dispatch(addSongToMyPlaylist(wantedSong, myStations[myPlaylistIdx]._id))
    }

    {
        return <div>
            {openModal && <ul onMouseLeave={() => setOpenModal(false)} style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="song-list-opts-menu">
                {myStations.map((station, myPlaylistIdx) =>
                    <div key={myPlaylistIdx}>
                        <li onClick={(ev) => onAddToMyPlaylist(myPlaylistIdx)}>Add to {station.name}</li>
                    </div>)}
            </ul>}
            {station.songs.map((song, songIdx) => {
                return <ol onClick={() => playCurrUrl(songIdx)} key={song.id} className="main-song-list">
                    <div>
                        <div>
                            {songIdx + 1}<img className="song-img" src={`${song.imgUrl}`} />
                        </div>
                        <div className="song-list-title-container">
                            <h6>{song.title}</h6>
                            <span>Artists</span>
                        </div>
                        <span>Album name</span>
                        <span>Date Added</span>
                        <button className="add-to-liked-btn" onClick={() => addToLikedPlaylist(song)}>Like</button>
                        <span className="song-duration-container">{song.songDuration}</span>
                        <button className="add-to-playlist-btn" ><img src={songMenu} onClick={(ev) => addToPlaylist(ev, song)} /></button>
                    </div>
                </ol>
            })}
        </div>
    }
}

{/* <ul style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="add-to-playlist-modal">
                    {myStations.map((station, myPlaylistIdx) =>
                        <div key={myPlaylistIdx}>
                            <li onClick={(ev) => onAddToMyPlaylist(myPlaylistIdx)}>{station.name}</li>
                        </div>)}
                </ul> */}

                //Menu with opts (Not Working for now)
// {
//     openModal && <ul onMouseLeave={() => myPlaylistsList(false)} style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="song-list-opts-menu">
//         <li onMouseEnter={() => myPlaylistsList(true)} className="add-to-playlist-modal">Add To Playlist</li>
//         {onMouseOverAddToPlaylist && <div>

//             <ul onMouseLeave={() => setOpenModal(false)} className="playlists-container" style={{ transform: `translate(${modalPos.posX - 10}px, ${modalPos.posY - 300}px )` }}>
//                 {myStations.map((station, myPlaylistIdx) =>
//                     <div key={myPlaylistIdx}>
//                         <li onClick={(ev) => onAddToMyPlaylist(myPlaylistIdx)}>{station.name}</li>
//                     </div>)}
//             </ul>
//         </div>
//         }
//         <li onMouseEnter={() => myPlaylistsList(true)} className="add-to-playlist-modal">Bli Bla Blu</li>
//         <li className="add-to-playlist-modal">Fli Fla Flu</li>
//         <li className="add-to-playlist-modal">Tli Tla Tlu</li>
//     </ul>
// }
// const myPlaylistsList = (diff) => {
//     setOnMouseOverAddToPlaylist(diff)
// }
