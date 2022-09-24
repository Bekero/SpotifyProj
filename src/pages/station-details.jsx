
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SongList } from '../cmps/song-list'
import { stationService } from '../services/station.service'
import { removeStation, setCurrStation, updateStation } from '../store/station.actions'
import { DetailsHeadLines } from '../cmps/details-head-lines'
import { DetailsToolBar } from '../cmps/details-tool-bar'
import { StationHeaderDetails } from '../cmps/station-header-details'
import { loadLikedSongs } from '../store/user.actions'
import { setCurrPlayingSongIdx, setIsPlayingSong } from '../store/song.actions'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export const StationDetails = () => {
    const user = useSelector(state => state.userModule.user)
    const isPlayingSong = useSelector(state => state.songModule.isPlayingSong)
    const params = useParams()
    const [station, setStation] = useState(null)
    const [itemList, setItemList] = useState(station?.songs);
    const [isEditStation, setEditStation] = useState(false)
    const [isDraggedItem, setIsDraggedItem] = useState(false)
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
    }, [params.stationId, isDraggedItem])

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
            setItemList(station?.songs)
        } catch (err) {
            console.log('Cannot get station :', err)
        }
    }

    const playCurrUrl = (songIdx, currStationId, songs) => {
        dispatch(setIsPlayingSong(!isPlayingSong))
        if (!currStationId) {
            console.log(songIdx, currStationId, songs)
            const station = { title: 'Falling stars', songs: songs.likedSongs }
            dispatch(setCurrPlayingSongIdx(songIdx))
            dispatch({ type: 'SET_CURR_STATION', station })
            return
        }
        if (songIdx === undefined) return
        dispatch(setCurrPlayingSongIdx(songIdx))
        dispatch(setCurrStation(currStationId))
    }

    const handleDrop = (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return
        let updatedList = [...itemList]
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1)
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem)
        // Update State
        setItemList(updatedList)
        const newStation = { ...station, songs: updatedList }
        dispatch(updateStation(newStation))
        setIsDraggedItem(!isDraggedItem) // Rendering Station after dragging something...
        // dispatch({ type: 'SET_CURRENTLY_PLAYING_SONG_IDX', songIdx: droppedItem.destination.index })
    };

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
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                        {(provided) => (
                            <div
                                className="list-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <SongList
                                    station={station}
                                    playCurrUrl={playCurrUrl}
                                    user={user}
                                />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext >
            </div>
        </section >
    )
}