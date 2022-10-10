import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist } from '../store/station.actions'
import { SongPreview } from './song-preview'
import { addLikedSong, removeLikedSong } from '../store/user.actions'
import ArrowInOptsMenu from './svg/arrow-in-opts-menu'
import { OptsMenu } from './opts-menu'

export const SongList = ({ station, playCurrUrl, user, removeFromPlaylist, setOpenModal, openModal }) => {

    const dispatch = useDispatch()

    const [wantedSong, setWantedSong] = useState(null)
    const [playHover, setPlayHover] = useState(false)
    // const [openModal, setOpenModal] = useState(null)
    const [modalPos, setModalPos] = useState(null)
    const [addToPlaylistModal, setAddToPlaylistModal] = useState(null)

    let stations = useSelector(state => state.stationModule.stations)
    let myStations = stations.filter(station => station?.createdBy?._id === user?._id)

    useEffect(() => {
        dispatch(loadStations())
    }, [])

    const addToPlaylist = (diff) => {
        setAddToPlaylistModal(diff)
    }

    const openOptsModal = (ev, song) => {
        let posX = ev.pageX - ev.view.innerWidth
        let posY = ev.pageY - 100
        let mousePos = { posX, posY }
        setModalPos(mousePos)
        setWantedSong(song)
        setOpenModal(true)
    }

    const onRemoveFromPlaylist = () => {
        setOpenModal(false)
        setAddToPlaylistModal(false)
        removeFromPlaylist(wantedSong)
    }

    const closeAllModals = (ev) => {
        setOpenModal(false)
        setAddToPlaylistModal(false)
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
        setOpenModal(false)
        setAddToPlaylistModal(false)
        dispatch(addSongToMyPlaylist(wantedSong, myStations[myPlaylistIdx]._id))
    }

    let currStation = station ? station.songs : user.likedSongs
    if (!currStation) return <></>
    return <div>
        {
            openModal &&
            <OptsMenu
                station={station}
                currStation={currStation}
                addToPlaylistModal={addToPlaylistModal}
                modalPos={modalPos}
                closeAllModals={closeAllModals}
                addToPlaylist={addToPlaylist}
                ArrowInOptsMenu={ArrowInOptsMenu}
                onRemoveFromPlaylist={onRemoveFromPlaylist}
                myStations={myStations}
                onAddToMyPlaylist={onAddToMyPlaylist}
            />
        }
        {
            currStation.map((currSong, songIdx) => {
                {/* Map to preview */ }
                return <SongPreview
                    key={currSong.id}
                    user={user}
                    station={station}
                    songIdx={songIdx}
                    currSong={currSong}
                    currStation={currStation}
                    playHover={playHover}
                    playCurrUrl={playCurrUrl}
                    addToLikedPlaylist={addToLikedPlaylist}
                    openOptsModal={openOptsModal}
                />
            })
        }

    </div >
}
