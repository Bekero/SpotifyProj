import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadStations, addSongToMyPlaylist, addUpdatedLikedStation, addStation } from '../store/station.actions'
import { myStationService } from '../services/my.station.service'
// import playSong from '../assets/img/play-song.png'
// import songMenu from '../assets/img/opts-song-list.png'
// import LikeSongPreview from '../cmps/svg/like-song-preview'
import OptsSvg from './svg/opts-song'
import LikeToolBar from '../cmps/svg/like-tool-bar-unfilled'
import PlaySong from '../cmps/svg/play-song-svg'

export const SongList = ({ station, playCurrUrl, likedStation }) => {

    const [wantedSong, setWantedSong] = useState(null)
    const [openModal, setOpenModal] = useState(null)
    const [modalPos, setModalPos] = useState(null)

    const dispatch = useDispatch()
    let stations = useSelector(state => state.stationModule.stations)
    let likedStationExist = useSelector(state => state.stationModule.likedSongsStation)

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
        console.log('newLikedStation :', newLikedStation)
        dispatch(addStation(newLikedStation))
        // dispatch(addUpdatedLikedStation(song))
    }

    const onAddToMyPlaylist = (myPlaylistIdx) => {
        setOpenModal(false)
        dispatch(addSongToMyPlaylist(wantedSong, myStations[myPlaylistIdx]._id))
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
                return <div key={song.id} className="song-preview">
                    <div className="song-number-play">
                        {/* Replace it with a svg */}
                        <div className="play-song-preview"><button onClick={() => playCurrUrl(songIdx)}><PlaySong /></button></div>
                        {/* <span>{songIdx + 1}</span> */}
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
                        <div className="like-song-preview-container"><button className="like-song-preview"><LikeToolBar /></button></div>
                        <div className="song-duration-container">{song.songDuration}</div>
                        <button onClick={(ev) => addToPlaylist(ev, song)} className="add-to-playlist-btn" ><OptsSvg /></button>
                    </div>
                </div>
            })}
        </>
    }
}
