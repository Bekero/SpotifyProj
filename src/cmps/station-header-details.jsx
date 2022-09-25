import React from 'react'
import { StationEditModal } from '../cmps/station-edit-modal'
import { utilService } from '../services/util.service'
import NewPlaylistDetailsSvg from './svg/new-playlist-details-svg'

export function StationHeaderDetails({ station, onRemoveStation, onEditStation, isEditStation, onCloseStation, user }) {

    const getPlaylistDuration = () => {
        let sum = 0
        station.songs.forEach(song => sum += +song.songDuration)
        return utilService.setTimestampToTime(sum)
    }
    return (
        <>
            <div className="img-container">
                {!station?.createdBy?.imgUrl ? <div> <NewPlaylistDetailsSvg /> </div> :
                    <img className="img-details" src={station?.createdBy?.imgUrl} />}

            </div>
            <div className="details-container">
                <span>{station ? 'ALBUM' : 'PLAYLIST'}</span>
                <h3 className="album-name">{station ? station.name : 'Liked Songs'}</h3>
                <div className="creator">
                    {station && <img className="artist-img-details" style={{ visibility: station?.createdBy?.artistImg !== '' ? 'initial' : 'hidden' }} src={station?.createdBy?.artistImg !== '' ? station?.createdBy?.artistImg : ""} alt="" />}
                    {station && <h3>{station?.createdBy?.fullname} | {station?.songs?.length} Songs, <span>Playlist duraion: {getPlaylistDuration()} </span></h3>}                </div>
            </div>
            {user && station?.isMyStation &&
                <div>
                    <button onClick={(ev) => onRemoveStation(station._id, ev)}>Delete</button>
                    <button onClick={(ev) => onEditStation(station._id, ev)}>Edit details</button>
                </div>
            }
            {isEditStation && <StationEditModal station={station} onCloseStation={onCloseStation} onEditStation={onEditStation} />}
        </>
    )
}