import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist } from '../store/station.actions'

export const SongList = ({ station, playCurrUrl }) => {

    // const [addToPlaylistModal, setAddToPlaylistModal] = useState(null)
    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [modalPos, setModalPos] = useState(null)

    const dispatch = useDispatch()
    let stations = useSelector(state => state.stationModule.stations)
    // let currPlayingSongUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    stations = stations.filter(station => station.isMyStation === true)
    useEffect(() => {
        dispatch(loadStations())
    }, [])

    const addToPlaylist = (ev, song) => {
        console.log('ev :', ev)
        let posX = ev.pageX - ev.view.innerWidth
        let posY = ev.pageY - 100
        let mousePos = { posX, posY }
        setModalPos(mousePos)
        setWantedSong(song)
        setOpenModal(true)
    }

    const addToLikedPlaylist = (song) => {
        // dispatch(addSongLikedPlaylist(song))
        // setWantedSong(song)
        // setOpenModal(true)
    }

    const onAddToMyPlaylist = (myPlaylistIdx) => {
        setOpenModal(false)
        dispatch(addSongToMyPlaylist(wantedSong, stations[myPlaylistIdx]._id))
    }

    {
        return <div>
            {
                openModal && <ul style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="add-to-playlist-modal">
                    {stations.map((station, myPlaylistIdx) =>
                        <div key={myPlaylistIdx}>
                            <li onClick={(ev) => onAddToMyPlaylist(myPlaylistIdx)}>{station.name}</li>
                        </div>)}
                </ul>
            }
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
                        {/* <div> */}
                        {/* </div> */}
                        <span>Album name</span>
                        <span>Date Added</span>
                        <button className="add-to-liked-btn" onClick={() => addToLikedPlaylist(song)}>Like</button>
                        <span className="song-duration-container">{song.songDuration}</span>
                        <button className="add-to-playlist-btn" onClick={(ev) => addToPlaylist(ev, song)}>Add</button>
                    </div>
                </ol>
            })}
        </div>
    }
}