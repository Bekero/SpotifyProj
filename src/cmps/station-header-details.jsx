import React from 'react'
import { StationEditModal } from '../cmps/station-edit-modal'

export function StationHeaderDetails({ currStation, station, onRemoveStation, onEditStation, likedStation, isEditStation, onCloseStation }) {

    return (
        <>
            <div className="img-container">
                <img className="img-details" src={currStation.createdBy.imgUrl ? currStation.createdBy.imgUrl : "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"} alt="" />
            </div>
            <div className="details-container">
                <span>{station ? 'ALBUM' : 'PLAYLIST'}</span>
                <h3 className="album-name">{currStation.name}</h3>
                <div className="creator">
                    {likedStation && <img className="artist-img-details" style={{ visibility: currStation.createdBy.imgUrl !== '' ? 'visible' : 'hidden' }} src={currStation.createdBy.imgUrl !== '' ? currStation.createdBy.imgUrl : ""} alt="" />}
                    {station && <img className="artist-img-details" style={{ visibility: currStation.createdBy.artistImg !== '' ? 'visible' : 'hidden' }} src={currStation.createdBy.artistImg !== '' ? currStation.createdBy.artistImg : ""} alt="" />}

                    <h3>{currStation.createdBy.fullname} * songsLength + Time of all playlist</h3>
                </div>
            </div>
            {currStation.isMyStation &&
                <div>
                    <button onClick={(ev) => onRemoveStation(currStation._id, ev)}>Delete</button>
                    <button onClick={(ev) => onEditStation(currStation._id, ev)}>Edit details</button>
                </div>
            }
            {isEditStation && <StationEditModal currStation={currStation} station={station} onCloseStation={onCloseStation} onEditStation={onEditStation} />}
        </>
    )
}