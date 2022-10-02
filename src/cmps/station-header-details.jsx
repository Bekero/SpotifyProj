import React, { useState } from 'react'
import { StationEditModal } from '../cmps/station-edit-modal'
import { utilService } from '../services/util.service'
import NewPlaylistDetailsSvg from './svg/new-playlist-details-svg'
import HoverNewPlaylistDetailsSvg from './svg/hover-new-playlist-details-svg.jsx'
import likedStationImg from '../assets/img/like-station-details.png'
import { FastAverageColor } from 'fast-average-color';
import { useEffect } from 'react';
import { uploadService } from '../services/upload.service';
import { useDispatch } from 'react-redux'
import { updateStation } from '../store/station.actions'

export function StationHeaderDetails({ station, updateLocalStation, onRemoveStation, onEditStation, isEditStation, onCloseStation, user, getBgcImg }) {
    // const [imgColor,setImgColor] = useState('white')
    const dispatch = useDispatch()
    const getPlaylistDuration = () => {
        let sum = 0
        station.songs.forEach(song => sum += +song.songDuration)
        return utilService.setTimestampToTime(sum)
    }

    useEffect(() => {

    }, [])
    const fac = new FastAverageColor();
    const container = document.querySelector('.img-container');

    fac.getColorAsync(station?.createdBy?.imgUrl)
        .then(color => {
            // container.style.backgroundColor = color.rgba;
            // container.style.color = color.isDark ? '#fff' : '#000';
            const imgColor = color?.rgba
            const txtColor = color?.isDark ? '#fff' : '#000'
            getBgcImg(imgColor, txtColor)
        })
        .catch(e => {
            // console.log(e);
        });

    const onUploadImg = async (ev) => {
        if (!ev.target.value) return
        const { url } = await uploadService.uploadImg(ev)
        const newStation = { ...station, createdBy: { ...station.createdBy, imgUrl: url } }
        await dispatch(updateStation(newStation))
        updateLocalStation(newStation)
    }

    return (
        <>
            <div className="img-container">
                <label>
                    <input type="file" onInput={onUploadImg} />
                </label>
                {station ? <div>
                    {station?.createdBy?.imgUrl ? <img className="img-details" src={station?.createdBy?.imgUrl} /> :
                        <div className="no-photo-img-details">
                            <div className="un-hover-new-playlist-bg"><NewPlaylistDetailsSvg /></div>
                            <div className="hover-new-playlist-bg">
                                <HoverNewPlaylistDetailsSvg />
                                <span>Choose photo</span>
                            </div>
                        </div>
                    } </div>
                    :
                    <div><img src={likedStationImg} />
                    </div>
                }
            </div>
            <div className="details-container">
                <span className='details-container-album-name'>{station ? 'ALBUM' : 'PLAYLIST'}</span>
                <h3 className="album-name">{station ? station.name : 'Liked Songs'}</h3>
                <div className="creator">
                    {station && <img className="artist-img-details" src={station?.createdBy?.artistImg !== '' ? station?.createdBy?.artistImg : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"} alt="" />}
                    {station && <h3>{station?.createdBy?.fullname} | {station?.songs?.length} Songs, <span>Playlist duration: {getPlaylistDuration()} </span></h3>}</div>
            </div>
            {station ? <div>
                {user && station?.createdBy?._id === user?._id &&
                    <div className='details-container-btn'>
                        <button onClick={(ev) => onRemoveStation(station._id, ev)}>Delete</button>
                        <button onClick={(ev) => onEditStation(station._id, ev)}>Edit details</button>
                    </div>
                }
            </div>
                :
                <></>
            }
            {isEditStation && <StationEditModal station={station} onCloseStation={onCloseStation} onEditStation={onEditStation} updateLocalStation={updateLocalStation} />}
        </>
    )
}