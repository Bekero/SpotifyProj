
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SongList } from '../cmps/song-list'
import { stationService } from '../services/station.service'
import { removeStation, setCurrPlayingSongIdx, setCurrPlayingUrl, setCurrStation, setCurrPlayingSong } from '../store/station.actions'
import { useSelector } from 'react-redux'
import { StationEditModal } from '../cmps/station-edit-modal'
import PlaySongToolBar from '../cmps/svg/play-song-tool-bar'
import LikeToolBar from '../cmps/svg/unfilled-like-tool-bar'
import OptsToolBar from '../cmps/svg/opts-song'
import DurationHeadLine from '../cmps/svg/duration-head-line.jsx'

export const StationDetails = ({ likedStation }) => {
    const params = useParams()
    const [station, setStation] = useState(null)
    const [isEditStation, setEditStation] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // let stations = useSelector(state => state.stationModule.stations)

    useEffect(() => {
        if (!params.stationId) return
        dispatch(setCurrStation(params.stationId))
        loadStation()
    }, [params.stationId])

    const onRemoveStation = async (stationId) => {
        // ev.stopPropagation()
        await dispatch(removeStation(stationId))
        navigate('/collection/playlist')
    }

    const onCloseStation = () => {
        setEditStation(!isEditStation)
    }

    const onEditStation = (station) => {
        setEditStation(!isEditStation)
        if (!isEditStation) return
        setStation(station)
    }

    const loadStation = async () => {
        const stationId = params.stationId
        try {
            const station = await stationService.getById(stationId)
            setStation(station)
        } catch (err) {
            console.log('Cannot get station :', err)
        }
    }

    const playCurrUrl = (songIdx) => {
        dispatch(setCurrPlayingSongIdx(songIdx))
        dispatch(setCurrPlayingSong(songIdx))
        dispatch(setCurrPlayingUrl(songIdx))
    }

    if (!station && !likedStation) return <div>Loading...</div>
    const currStation = likedStation || station
    return (
        <section className="main-details-container">
            <div className="station-details">
                <div className="img-container">
                    <img className="img-details" src={station ? currStation.createdBy.imgUrl : "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"} alt="" />
                </div>
                <div className="details-container">
                    <span>{station ? 'ALBUM' : 'PLAYLIST'}</span>
                    <h3 className="album-name">{currStation.name}</h3>
                    <div className="creator">
                        <img className="artist-img-details" src={currStation.createdBy.artistImg} alt="" />
                        <h3>{currStation.createdBy.fullname} * songsLength + Time of all playlist</h3>
                    </div>
                </div>
                {currStation.isMyStation &&
                    <div>
                        <button onClick={(ev) => onRemoveStation(currStation._id, ev)}>Delete</button>
                        <button onClick={(ev) => onEditStation(currStation._id, ev)}>Edit details</button>
                    </div>
                }
                {isEditStation && <StationEditModal currStation={currStation} onCloseStation={onCloseStation} onEditStation={onEditStation} />}
            </div>
            <div className="details-tool-bar">
                <div className="play-song-tool-bar-container"><button className="play-song-tool-bar"><PlaySongToolBar /></button></div>
                {!currStation.isLikedStation && <div className="like-tool-bar-container"><button className="like-tool-bar" ><span><LikeToolBar /></span></button></div>}
                {!currStation.isLikedStation && <div className="opts-tool-bar-container"><button className="opts-tool-bar" ><span><OptsToolBar /></span></button></div>}
            </div>
            <div className="main-details">
                <section className="details-head-lines">
                    <div>#</div>
                    <div className="title-head-line">TITLE</div>
                    <div className="album-head-line">ALBUM</div>
                    <div className="date-added-head-line">DATE ADDED</div>
                    <div className="time-head-line"><DurationHeadLine /></div>
                </section>
                <section>
                    <SongList currStation={currStation} playCurrUrl={playCurrUrl} />
                </section>
            </div>
        </section >
    )
}