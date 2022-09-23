import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist, removeLikedSongFromMyPlaylist, addStation } from '../store/station.actions'
import { SongPreview } from './song-preview'
import { addLikedSong, removeLikedSong } from '../store/user.actions'
// import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export const SongList = ({ station, playCurrUrl, user }) => {
    const currUser = useSelector(state => state.userModule.user)
    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [modalPos, setModalPos] = useState(null)
    const [playHover, setPlayHover] = useState(false)
    const [currSongIdx, setCurrSongIdx] = useState(null)

    const dispatch = useDispatch()

    let stations = useSelector(state => state.stationModule.stations)
    // let myStations = stations.filter(station => station.isMyStation === true)

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

    const addToLikedPlaylist = (wantedSong) => {
        if (!user) {
            dispatch(addLikedSong(wantedSong))
            return
        }
        else {
            let isSongExists = user.likedSongs?.find(song => song.id === wantedSong.id)
            if (isSongExists) dispatch(removeLikedSong(wantedSong))
            else if (!isSongExists) dispatch(addLikedSong(wantedSong))
            return
        }
    }

    const onAddToMyPlaylist = (myPlaylistIdx) => {
        // console.log(myStations[myPlaylistIdx]._id);
        setOpenModal(false)
        dispatch(addSongToMyPlaylist(wantedSong, stations[myPlaylistIdx]._id))
    }

    const onSongHover = (diff, songIdx) => {
        setPlayHover(diff)
        setCurrSongIdx(songIdx)
    }

    let currStation = station ? station.songs : user.likedSongs

    if (!currStation) return <></>
    return <>
        {/* {openModal && <ul onMouseLeave={() => setOpenModal(false)} style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="song-list-opts-menu">
            {myStations.map((station, myPlaylistIdx) =>
                <div key={myPlaylistIdx}>
                    <li onClick={(ev) => onAddToMyPlaylist(myPlaylistIdx)}>Add to {station.name}</li>
                </div>)} */}
        {/* </ul>} */}
        {/* Map to preview */}
        {currStation.map((currSong, songIdx) => {
            return <SongPreview
                key={currSong.id}
                user={user}
                station={station}
                songIdx={songIdx}
                currSong={currSong}
                currSongIdx={currSongIdx}
                currStation={currStation}
                playHover={playHover}
                onSongHover={onSongHover}
                playCurrUrl={playCurrUrl}
                addToLikedPlaylist={addToLikedPlaylist}
                addToPlaylist={addToPlaylist}
            />
        })}

    </>
}
