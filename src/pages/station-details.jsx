
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SongList } from '../cmps/song-list'
import { stationService } from '../services/station.service'
import { removeStation, setCurrPlayingSongIdx, setCurrPlayingUrl, setCurrStation, setCurrPlayingSong } from '../store/station.actions'
import { DetailsHeadLines } from '../cmps/details-head-lines'
import { DetailsToolBar } from '../cmps/details-tool-bar'
import { StationHeaderDetails } from '../cmps/station-header-details'
import { loadLikedSongs } from '../store/user.actions'

export const StationDetails = ({ likedStation }) => {
    const user = useSelector(state => state.userModule.user)
    const params = useParams()
    const [station, setStation] = useState(null)
    const [isEditStation, setEditStation] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!params.stationId) return
        loadStation()
        if (!user) {
            dispatch(loadLikedSongs())
        }


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
        // dispatch(setCurrPlayingSong(songIdx))
        // dispatch(setCurrPlayingUrl(songIdx))
    }

    if (!station && !likedStation) return <div>Loading...</div>
    const currStation = likedStation || station
    return (
        <section className="main-details-container">
            <div className="station-details">
                <StationHeaderDetails
                    currStation={currStation}
                    station={station}
                    likedStation={likedStation}
                    onRemoveStation={onRemoveStation}
                    onEditStation={onEditStation}
                    onCloseStation={onCloseStation}
                    isEditStation={isEditStation}
                />
            </div>
            <div className="details-tool-bar">
                <DetailsToolBar currStation={currStation} />
            </div>
            <div className="main-details">
                <section className="details-head-lines">
                    <DetailsHeadLines />
                </section>
                <section>
                    <SongList currStation={currStation} playCurrUrl={playCurrUrl} user={user ? user : ''} />
                </section>
            </div>
        </section >
    )
}