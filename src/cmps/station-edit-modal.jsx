import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { stationService } from "../services/station.service"
import { updateStation } from "../store/station.actions"
import NewPlaylistDetailsSvg from './svg/new-playlist-details-svg'

export const StationEditModal = ({ station, onEditStation, onCloseStation, updateLocalStation }) => {

    const [newStation, handleChange, setStation] = useForm({
        name: '',
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setStation(station)
    }, [])

    const onSaveStation = async (ev) => {
        ev.preventDefault()
        await dispatch(updateStation({ ...newStation }))
        onEditStation(newStation)
        // await dispatch(updateStation(newStation))
        updateLocalStation(newStation)
    }

    return (
        <div className="station-edit-modal">
            <div className="edit-details-title">
                <h1>Edit details</h1>
                <button onClick={onCloseStation}><svg role="img" height="16" width="16" aria-label="Close" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M1.47 1.47a.75.75 0 011.06 0L8 6.94l5.47-5.47a.75.75 0 111.06 1.06L9.06 8l5.47 5.47a.75.75 0 11-1.06 1.06L8 9.06l-5.47 5.47a.75.75 0 01-1.06-1.06L6.94 8 1.47 2.53a.75.75 0 010-1.06z"></path></svg></button>
            </div>
            <div className="edit-details-container">
                {/* <img className="img-details" src={station.createdBy.imgUrl} alt="" /> */}
                <div className="img-or-svg">{station?.createdBy?.imgUrl ? <img className="img-details" src={station?.createdBy?.imgUrl} /> :
                    <div><NewPlaylistDetailsSvg /></div>
                }</div>
                <div className="edit-details-form">
                    <form onSubmit={onSaveStation}>
                        <input value={newStation.name} onChange={handleChange} name="name" id="name" />
                        <button>Save</button>
                    </form>
                </div>
            </div>
            <p className="confirm-txt">By proceeding, you agree to give Harmony access to the image you choose to upload. Please make sure you have the right to upload the image.</p>
        </div>
    )
}