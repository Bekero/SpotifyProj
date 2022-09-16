
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { StationEditModal } from '../cmps/station-edit-modal'
import { stationService } from '../services/station.service'
import { removeStation, setCurrPlayingSongIdx, setCurrPlayingUrl, setCurrStation } from '../store/station.actions'

export const StationDetails = () => {
    const params = useParams()
    const [station, setStation] = useState(null)

    const [isEditStation, setEditStation] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadStation()
        dispatch(setCurrStation(params.stationId))
    }, [params.stationId])


    const onRemoveStation = (stationId) => {
        // ev.stopPropagation()
        dispatch(removeStation(stationId))
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
        console.log(songIdx)
        dispatch(setCurrPlayingSongIdx(songIdx))
        dispatch(setCurrPlayingUrl(songIdx))
    }

    if (!station) return <div>Loading...</div>
    return (
        <section className="main-details-container">
            <div className="station-details">
                <div className="img-container">
                    <img className="img-details" src={station.createdBy.imgUrl} alt="" />
                    {/* <img className="img-details" src={`https://robohash.org/${station._id}?set=set5`} /> */}
                </div>
                <div className="details-container">
                    <h3>{station.name}</h3>
                    <h3>{station.createdBy.fullname}</h3>
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
                Tool Bar Here...
            </div>
            <div className="details-head-lines">
                HeadLine Here...
            </div>
            <hr></hr>
            <div>

                {!station.songs.length && <div>No Songs</div>}
                <ol>
                    {/* {Move to other component} */}
                    {station.songs.map((song, songIdx) => {
                        return <div onClick={() => playCurrUrl(songIdx)} key={song.id} className="main-song-list">
                            {/* return <div onClick={() => playCurrUrl(song.url)} key={song.id} className="main-song-list"> */}
                            <div>
                                <li>
                                    <img className="song-img" src={`${song.imgUrl}`} />
                                </li>
                            </div>
                            <h6>{song.title}</h6>
                            <span>Album name</span>
                            <span>Date Added</span>
                            <span>{song.songDuration}</span>
                        </div>
                    })}
                </ol>
            </div>
        </section>
    )
}