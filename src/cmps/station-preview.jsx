
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCurrStation } from "../store/station.actions";
import NewPlaylistPreviewSvg from "./svg/new-playlist-preview-svg";
import PlaySongToolBar from '../cmps/svg/play-song-tool-bar'
import PauseSongToolBar from '../cmps/svg/pause-song-tool-bar'
import { setCurrPlayingSongIdx, setIsPlayingSong } from "../store/song.actions";
import { useEffect, useState } from "react";

export function StationPreview({ station }) {

    const isPlayingSong = useSelector(state => state.songModule.isPlayingSong)
    const currSongIdx = useSelector(state => state.songModule.currSongIdx)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getLabels = () => {
        return station.tags.join(', ')
    }

    const onSetCurrStation = async () => {
        navigate(`/playlist/${station._id}`)
    }

    const playCurrUrl = async (ev) => {
        debugger
        ev.stopPropagation()
        if (!currSongIdx) {
            await dispatch(setCurrPlayingSongIdx(0))
        }
        dispatch(setIsPlayingSong(!isPlayingSong))
    }

    return (
        // <Link onClick={onSetCurrStation} className="text-decoration" to={`/playlist/${station._id}`}>
        <div onClick={onSetCurrStation}>

            <div className='station-preview'>
                <div className="img-details-container">
                    {!station?.createdBy?.imgUrl ? <div className="img-details-new-playlist"> <NewPlaylistPreviewSvg /> </div> :
                        <img className="img-details" src={station?.createdBy?.imgUrl} />}
                    <div className="play-btn-preview">
                        <div className="play-song-tool-bar-container"><button onClick={playCurrUrl} className="play-song-tool-bar">{!isPlayingSong ? <PlaySongToolBar /> : <PauseSongToolBar />}</button></div>
                    </div>
                </div>
                <div className="station-preview-artist">
                    <div className="station-preview-label">{station.name}</div>
                    <div className="station-preview-artist-name">{station?.createdBy?.fullname}</div>
                </div>
            </div>
        </div>
        // </Link>
    )
}