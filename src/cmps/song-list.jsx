import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist } from '../store/station.actions'

export const SongList = ({ station, playCurrUrl }) => {

    const [addToPlaylistModal, setAddToPlaylistModal] = useState(null)
    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)

    const dispatch = useDispatch()
    let stations = useSelector(state => state.stationModule.stations)

    useEffect(() => {
        dispatch(loadStations())
    }, [openModal])

    stations = stations.filter(station => station.isMyStation == true)

    const addToPlaylist = (song) => {
        setWantedSong(song)
        setOpenModal(true)
        setAddToPlaylistModal(true)
    }

    const onAddToMyPlaylist = (ev, myPlaylistIdx,) => {
        setOpenModal(false)
        dispatch(addSongToMyPlaylist(wantedSong, stations[myPlaylistIdx]._id))
    }

    {
        return <div>
            {
                openModal && <ul className="add-to-playlist-modal">
                    {stations.map((station, myPlaylistIdx) =>
                        <div key={myPlaylistIdx}>
                            <li onClick={(ev) => onAddToMyPlaylist(ev, myPlaylistIdx)}>{station.name}</li>
                        </div>)}
                </ul>
            }
            {station.songs.map((song, songIdx) => {
                return <ol onClick={() => playCurrUrl(songIdx)} key={song.id} className="main-song-list">
                    <div>
                        <div>
                            <img className="song-img" src={`${song.imgUrl}`} />
                        </div>
                        <span>Album name</span>
                    <h6>{song.title}</h6>
                    {/* <div> */}
                    {/* </div> */}
                    <button onClick={() => addToPlaylist(song)}>Add</button>
                    <span>Date Added</span>
                    <span>{song.songDuration}</span>
                    </div>
                </ol>
            })}
        </div>
    }
}