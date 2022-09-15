
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { stationService } from '../services/station.service'
import { removeStation } from '../store/station.actions'

export const StationDetails = () => {
    const params = useParams()
    const [station, setStation] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadStation()
    }, [params.stationId])

    const onRemoveStation = (stationId) => {
        // ev.stopPropagation()
        dispatch(removeStation(stationId))
        navigate('/collection/playlist')
    }

    const loadStation = () => {
        const stationId = params.stationId
        stationService.getById(stationId)
            .then(station => setStation(station))
    }

    const onBack = () => {
        navigate('/')
    }

    if (!station) return <div>Loading...</div>
    return (
        <section className="main-details-container">
            <div className="station-details">
                <div className="img-container">
                    {/* <img className="img-details" src={station.createdBy.imgUrl} alt="" /> */}
                    <img className="img-details" src={`https://robohash.org/${station._id}?set=set5`} />
                </div>
                <div className="details-container">
                    <h3>{station.name}</h3>
                    <h3>{station.createdBy.fullname}</h3>
                    {/* <button onClick={onBack}>Back to Stations App</button> */}
                    {/* <Link to={`/station/edit/${station._id}`}><button>Edit</button></Link> */}
                </div>
                <button onClick={(ev) => onRemoveStation(station._id, ev)}>Delete</button>
                <div>
                </div>
            </div>
            <div className="details-tool-bar">
                Tool Bar Here...
            </div>
            <div className="details-head-lines">
                HeadLine Here...
            </div>
            <hr></hr>
            <div>

                <ol>
                    {station.songs.map(song => {
                        return <div key={song.id} className="main-song-list">
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