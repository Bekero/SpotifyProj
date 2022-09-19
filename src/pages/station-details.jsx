
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
import LikeToolBar from '../cmps/svg/like-tool-bar-unfilled'
import OptsToolBar from '../cmps/svg/opts-song'

export const StationDetails = () => {
    const params = useParams()
    const [station, setStation] = useState(null)

    const [isEditStation, setEditStation] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let stations = useSelector(state => state.stationModule.stations)
    useEffect(() => {
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

    if (!station) return <div>Loading...</div>
    return (
        <section className="main-details-container">
            <div className="station-details">
                <div className="img-container">
                    <img className="img-details" src={station.createdBy.imgUrl} alt="" />
                </div>
                <div className="details-container">
                    <span>ALBUM</span>
                    <h3 className="album-name">{station.name}</h3>
                    <div className="creator">
                        <img className="artist-img-details" src={station.createdBy.artistImg} alt="" />
                        <h3>{station.createdBy.fullname}</h3>
                    </div>
                </div>
                {station.isMyStation &&
                    <div>
                        <button onClick={(ev) => onRemoveStation(station._id, ev)}>Delete</button>
                        <button onClick={(ev) => onEditStation(station._id, ev)}>Edit details</button>
                    </div>
                }
                {isEditStation && <StationEditModal station={station} onCloseStation={onCloseStation} onEditStation={onEditStation} />}
            </div>
            <div className="details-tool-bar">
                <div className="play-song-tool-bar-container"><button className="play-song-tool-bar"><PlaySongToolBar /></button></div>
                <div className="like-tool-bar-container"><button className="like-tool-bar" ><span><LikeToolBar /></span></button></div>
                <div className="opts-tool-bar-container"><button className="opts-tool-bar" ><span><OptsToolBar /></span></button></div>
            </div>
            <div className="main-details">
                <section className="details-head-lines">
                    <div>#</div>
                    <div className="title-head-line">TITLE</div>
                    <div className="album-head-line">ALBUM</div>
                    <div className="date-added-head-line">DATE ADDED</div>
                    <div className="time-head-line">O</div>
                </section>
                <section>
                    <SongList station={station} playCurrUrl={playCurrUrl} />
                </section>
            </div>
        </section>
    )
}