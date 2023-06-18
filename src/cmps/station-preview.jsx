
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import NewPlaylistPreviewSvg from "./svg/new-playlist-preview-svg";
import PlaySongToolBar from '../cmps/svg/play-song-tool-bar'
import PauseSongToolBar from '../cmps/svg/pause-song-tool-bar'
import { setCurrPlayingSongIdx, setIsPlayingSong } from "../store/song.actions";

export function StationPreview({ path, station }) {

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
    const playCurrStation = async () => {
        dispatch({ type: 'SET_CURR_STATION', station })
        dispatch(setCurrPlayingSongIdx(0))
    }

    const playCurrUrl = async (ev) => {
        ev.stopPropagation()
        if (!currSongIdx) {
            await dispatch(setCurrPlayingSongIdx(0))
        }
        dispatch(setIsPlayingSong(!isPlayingSong))
    }

    return (
        // <Link onClick={onSetCurrStation} className="text-decoration" to={`/playlist/${station._id}`}>
        <div className='station-preview' style={{height: `${path === '/collection/playlist' && '300px'} `}} onClick={onSetCurrStation}>
            <div className="img-details-container">
                {!station?.createdBy?.imgUrl ? <div className="img-details-new-playlist"> <NewPlaylistPreviewSvg /> </div> :
                    <img className="img-details" src={station?.createdBy?.imgUrl} />}
            </div>
            <div className="station-preview-artist">
                <div className="station-preview-label">{station.name}</div>
                <div className="station-preview-artist-name">{station?.createdBy?.fullname}</div>
            </div>
            <button onClick={(ev) => {
                if (!isPlayingSong) playCurrStation()
                playCurrUrl(ev)
            }} className="play-song-tool-bar">{!isPlayingSong ? <PlaySongToolBar /> : <PauseSongToolBar />}</button>
        </div>
        // </Link>
    )
}