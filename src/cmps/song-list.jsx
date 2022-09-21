import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist, removeLikedSongFromMyPlaylist, addStation } from '../store/station.actions'
// import { myStationService } from '../services/my.station.service'
// import songMenu from '../assets/img/opts-song-list.png'
// import LikeSongPreview from '../cmps/svg/like-song-preview'
import OptsSvg from './svg/opts-song'
import FilledLikeToolBar from './svg/filled-like-tool-bar'
import UnFilledLikeToolBar from './svg/unfilled-like-tool-bar'
import { SongPreview } from './song-preview'
import { addLikedSong, removeLikedSong } from '../store/user.actions'
// import PauseSong from '../cmps/svg/pause-song-svg.jsx'

export const SongList = ({ station, playCurrUrl, user }) => {
    // let station = currStation
    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [modalPos, setModalPos] = useState(null)
    const [playHover, setPlayHover] = useState(false)
    const [currSongIdx, setCurrSongIdx] = useState(null)

    const dispatch = useDispatch()

    let stations = useSelector(state => state.stationModule.stations)
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

    const addToLikedPlaylist = (wantedSong) => {
        if (!user) {
            dispatch(addLikedSong(wantedSong))
            return
        }
        else {
            let checkIfSongExist = user.find(song => song.id === wantedSong.id)
            if (checkIfSongExist) dispatch(removeLikedSong(wantedSong))
            else if (!checkIfSongExist) dispatch(addLikedSong(wantedSong))
            return
        }
    }

    const onAddToMyPlaylist = (myPlaylistIdx) => {
        setOpenModal(false)
        dispatch(addSongToMyPlaylist(wantedSong, myStations[myPlaylistIdx]._id))
    }

    const onSongHover = (diff, songIdx) => {
        setPlayHover(diff)
        setCurrSongIdx(songIdx)
    }
    {
        return <>
            {openModal && <ul onMouseLeave={() => setOpenModal(false)} style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="song-list-opts-menu">
                {myStations.map((station, myPlaylistIdx) =>
                    <div key={myPlaylistIdx}>
                        <li onClick={(ev) => onAddToMyPlaylist(myPlaylistIdx)}>Add to {station.name}</li>
                    </div>)}
            </ul>}
            <SongPreview
                user={user}
                station={station}
                playHover={playHover}
                onSongHover={onSongHover}
                playCurrUrl={playCurrUrl}
                addToLikedPlaylist={addToLikedPlaylist}
                addToPlaylist={addToPlaylist}
                currSongIdx={currSongIdx} />
        </>
    }
}
