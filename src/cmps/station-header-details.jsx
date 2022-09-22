import React from 'react'
import { StationEditModal } from '../cmps/station-edit-modal'

export function StationHeaderDetails({ station, onRemoveStation, onEditStation, isEditStation, onCloseStation, user }) {

    return (
        <>
            <div className="img-container">
                <img className="img-details" src={station ? station.createdBy.imgUrl : "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"} alt="" />
            </div>
            <div className="details-container">
                <span>{station ? 'ALBUM' : 'PLAYLIST'}</span>
                <h3 className="album-name">{station ? station.name : 'Liked Songs'}</h3>
                <div className="creator">
                    {station && <img className="artist-img-details" style={{ visibility: station.createdBy.artistImg !== '' ? 'visible' : 'hidden' }} src={station.createdBy.artistImg !== '' ? station.createdBy.artistImg : ""} alt="" />}
                    {station && <h3>{station.createdBy.fullname} | {station.songs.length} Songs </h3>}
                </div>
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