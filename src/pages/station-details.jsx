
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SongList } from '../cmps/song-list'
import { stationService } from '../services/station.service'
import { removeStation, setCurrPlayingUrl, setCurrStation, setCurrPlayingSong } from '../store/station.actions'
import { DetailsHeadLines } from '../cmps/details-head-lines'
import { DetailsToolBar } from '../cmps/details-tool-bar'
import { StationHeaderDetails } from '../cmps/station-header-details'
import { loadLikedSongs } from '../store/user.actions'
import { setCurrPlayingSongIdx } from '../store/song.actions'

export const StationDetails = () => {
    const user = useSelector(state => state.userModule.user)
    const stationFromStore = useSelector(state => state.stationModule.currStation)
    const params = useParams()
    const [station, setStation] = useState(null)
    const [isEditStation, setEditStation] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (params.stationId) {
            loadStation()
            if (!user) {
                dispatch(loadLikedSongs())
            }
        }
        else if (!params.stationId) return
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

    const playCurrUrl = (songIdx, currStationId, songs) => {
        console.log('asdasdasdasdasdasdasdasd', songs);
        if (!currStationId) {
            const station = { title: 'Falling stars', songs: songs }
            dispatch(setCurrPlayingSongIdx(songIdx))
            dispatch({ type: 'SET_CURR_STATION', station })
            return
        }
        if (songIdx === undefined) return
        dispatch(setCurrPlayingSongIdx(songIdx))
        dispatch(setCurrStation(currStationId))
        // dispatch(setCurrPlayingSong(songIdx))
        // dispatch(setCurrPlayingUrl(songIdx))
    }
    if (!station && !user) return <div>Loading...</div>
    return (
        <section className="main-details-container">
            <div className={station ? "station-details" : "station-details liked"}>
                <StationHeaderDetails
                    station={station}
                    user={user}
                    onRemoveStation={onRemoveStation}
                    onEditStation={onEditStation}
                    onCloseStation={onCloseStation}
                    isEditStation={isEditStation}
                />
            </div>
            <div className="details-tool-bar">
                <DetailsToolBar station={station} user={user} />
            </div>
            <div className="main-details">
                <section className="details-head-lines">
                    <DetailsHeadLines />
                </section>
                <section>
                    <SongList
                        station={station}
                        playCurrUrl={playCurrUrl}
                        user={user}
                    />
                </section>
            </div>
        </section >
    )
}