import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist, removeLikedSongFromMyPlaylist, addStation } from '../store/station.actions'
// import { myStationService } from '../services/my.station.service'
// import playSong from '../assets/img/play-song.png'
// import songMenu from '../assets/img/opts-song-list.png'
// import LikeSongPreview from '../cmps/svg/like-song-preview'
import OptsSvg from './svg/opts-song'
import FilledLikeToolBar from '../cmps/svg/filled-like-tool-bar'
import UnFilledLikeToolBar from '../cmps/svg/unfilled-like-tool-bar'
import PlaySong from '../cmps/svg/play-song-svg'
// import PauseSong from '../cmps/svg/pause-song-svg.jsx'

export const SongList = ({ currStation, playCurrUrl, likedStation }) => {

    let station = currStation
    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [modalPos, setModalPos] = useState(null)
    const [playHover, setPlayHover] = useState(false)
    const [currSongIdx, setCurrSongIdx] = useState(null)

    const dispatch = useDispatch()
    let stations = useSelector(state => state.stationModule.stations)
    // let currPlayingSong = useSelector(state => state.stationModule.currPlayingSong)

    let myStations = stations.filter(station => station.isMyStation === true)

    useEffect(() => {
        dispatch(loadStations())
    }, [])

    useEffect(() => { }, [])

    const addToPlaylist = (ev, song) => {
        let posX = ev.pageX - ev.view.innerWidth
        let posY = ev.pageY - 100
        let mousePos = { posX, posY }
        setModalPos(mousePos)
        setWantedSong(song)
        setOpenModal(true)
    }

    const addToLikedPlaylist = async (song) => {
        let newLikedStation = stations.find(station => station.isLikedStation === true)
        if (song.isLiked) {
            song.isLiked = false
            dispatch(removeLikedSongFromMyPlaylist(song, newLikedStation._id))
            return
        }
        else {
            dispatch(addSongToMyPlaylist(song, newLikedStation._id))
            song.isLiked = true
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
            {station.songs.map((song, songIdx) => {
                return <div onMouseOver={() => onSongHover(true, songIdx)} onMouseLeave={() => onSongHover(false, songIdx)} key={song.id} className="song-preview">
                    <div className="song-number-play">
                        {(playHover && (currSongIdx === songIdx)) ?
                            <div className="play-song-preview"><button onClick={() => playCurrUrl(songIdx)}>{<PlaySong />}</button></div> : <div>{songIdx + 1}</div>}
                    </div>
                    <div className='song-list-title-container'>
                        <img className="song-img" src={`${song.imgUrl}`} />
                        <div className='song-list-title'>
                            <div className="song-title">{song.title}</div>
                            <div className="artists-name">Artists</div>
                        </div>
                    </div>
                    <div className="album-name">
                        <span>Album name</span>
                    </div>
                    <div className='date-added'>
                        <span>Date Added</span>
                    </div>
                    <div className="opts-menu-section">
                        <button onClick={() => addToLikedPlaylist(song)} className={song.isLiked ? "is-liked-song-preview" : "like-song-preview"}>{song.isLiked ? <FilledLikeToolBar /> : <UnFilledLikeToolBar />}</button>
                        <div className="song-duration-container">{song.songDuration}</div>
                        <div><button onClick={(ev) => addToPlaylist(ev, song)} className="add-to-playlist-btn" ><OptsSvg /></button></div>
                    </div>
                </div>
            })}
        </>
    }
}
