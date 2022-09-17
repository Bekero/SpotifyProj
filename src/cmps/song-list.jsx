import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist } from '../store/station.actions'

export const SongList = ({ station, playCurrUrl }) => {

    // const [addToPlaylistModal, setAddToPlaylistModal] = useState(null)
    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    // const [currSong, setCurrSong] = useState(null)

    const dispatch = useDispatch()
    let stations = useSelector(state => state.stationModule.stations)
    let currPlayingSongUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    stations = stations.filter(station => station.isMyStation === true)
    useEffect(() => {
        dispatch(loadStations())
    }, [])

    const addToPlaylist = (song) => {
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
        console.log('stations[myPlaylistIdx] :', stations[myPlaylistIdx]._id)
        dispatch(addSongToMyPlaylist(wantedSong, stations[myPlaylistIdx]._id))
    }

    {
        return <div>
            {
                openModal && <ul className="add-to-playlist-modal">
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
                            {songIdx}<img className="song-img" src={`${song.imgUrl}`} />
                        </div>
                        <div className="kaki-bepita">
                            <h6>{song.title}</h6>
                            <span>Artists</span>
                        </div>
                        {/* <div> */}
                        {/* </div> */}
                        <span>Album name</span>
                        <span>Date Added</span>
                        <button className="add-to-liked-btn" onClick={() => addToLikedPlaylist(song)}>Like</button>
                        <span className="song-duration-container">{song.songDuration}</span>
                        <button className="add-to-playlist-btn" onClick={() => addToPlaylist(song)}>Add</button>
                    </div>
                </ol>
            })}
        </div>
    }
}