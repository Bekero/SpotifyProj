
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SongList } from '../cmps/song-list'
import { stationService } from '../services/station.service'
import { addSongToMyPlaylist, removeStation, setCurrStation, updateStation } from '../store/station.actions'
import { DetailsHeadLines } from '../cmps/details-head-lines'
import { DetailsToolBar } from '../cmps/details-tool-bar'
import { StationHeaderDetails } from '../cmps/station-header-details'
import { loadLikedSongs } from '../store/user.actions'
import { setCurrPlayingSongIdx, setIsPlayingSong } from '../store/song.actions'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { SearchList } from '../cmps/search-list'
import { youtubeService } from '../services/youtube.service'
import { AppSearch } from './app-search'


export const StationDetails = () => {
    const user = useSelector(state => state.userModule.user)
    const currStation = useSelector(state => state.stationModule.currStation)
    const params = useParams()
    const [station, setStation] = useState(null)
    const [itemList, setItemList] = useState(station?.songs);
    const [isEditStation, setEditStation] = useState(false)
    const [isDraggedItem, setIsDraggedItem] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [imgColor, setImgColor] = useState('#121212')
    const [txtColor, setTxtColor] = useState('white')



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

    const onEditStation = (stationId) => {
        console.log('stationId :', stationId)
        setEditStation(!isEditStation)
        if (!isEditStation) return
        setStation(stationId)
    }

    const loadStation = async () => {
        const stationId = params.stationId
        try {
            const station = await stationService.getById(stationId)
            setStation(station)
            setItemList(station?.songs)
            if(!currStation){
                dispatch(setCurrStation(stationId))
            }
        } catch (err) {
            console.log('Cannot get station :', err)
        }
    }

    const playCurrUrl = (songIdx, currStationId, songs, isSongPlaying) => {
        dispatch(setIsPlayingSong(isSongPlaying))
        if (!currStationId) {
            const station = { title: 'Falling stars', songs: songs.likedSongs }
            dispatch(setCurrPlayingSongIdx(songIdx))
            dispatch({ type: 'SET_CURR_STATION', station })
            return
        }
        if (songIdx === undefined) return
        dispatch(setCurrPlayingSongIdx(songIdx))
        dispatch(setCurrStation(currStationId))
    }

    const getBgcImg = (imgClr = '#121212', txtClr = '#121212') => {
        console.log(imgClr, txtClr);
        setImgColor(imgClr)
        setTxtColor(txtClr)
    }

    const addSongToPlaylist = async (ev, song) => {
        ev.stopPropagation()
        const filteredSong = {
            id: song.id,
            url: song.id,
            imgUrl: song.contentDetails.imgUrl,
            title: song.contentDetails.title.replace(/(\(.*?\))/g, ''),
            songDuration: youtubeService.getSongDuration(song.contentDetails.duration)
        }
        await dispatch(addSongToMyPlaylist(filteredSong))
        loadStation()
    }

    const handleDrop = async (droppedItem) => {
        // Ignore drop outside droppable container
        if (!droppedItem.destination) return
        let updatedList = [...itemList]
        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1)
        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem)
        // Update State
        await setItemList(updatedList)
        const newStation = { ...station, songs: updatedList }
        await dispatch(updateStation(newStation))
        setIsDraggedItem(!isDraggedItem) // Rendering Station after dragging something...
        // dispatch({ type: 'SET_CURRENTLY_PLAYING_SONG_IDX', songIdx: droppedItem.destination.index })
    };

    if (!station && !user) return <div>Loading...</div>
    return (
        <section className="main-details-container">
            <div style={{ backgroundColor: imgColor, color: txtColor }} className={station ? "station-details" : "station-details liked"}>
                <StationHeaderDetails
                    station={station}
                    user={user}
                    onRemoveStation={onRemoveStation}
                    onEditStation={onEditStation}
                    onCloseStation={onCloseStation}
                    isEditStation={isEditStation}
                    getBgcImg={getBgcImg}
                />
            </div>
            <div style={{ backgroundImage: `linear-gradient(${imgColor},#121212)` }} className="details-tool-bar">
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
            {station ? <div>
                {station?.createdBy?._id === user?._id && <div>
                    <AppSearch addSongToPlaylist={addSongToPlaylist} />
                </div>
                }
            </div>
                :
                <></>
            }
        </section >
    )
}