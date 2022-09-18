import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../hooks/useForm"
import { stationService } from "../services/station.service"
import { updateStation } from "../store/station.actions"


export const StationEditModal = ({ station, onEditStation, onCloseStation }) => {

    const [newStation, handleChange, setStation] = useForm({
        name: '',
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setStation(station)
    }, [])

    const onSaveStation = (ev) => {
        ev.preventDefault()
        // const stationToSave = { ...newStation }
        dispatch(updateStation({ ...newStation }))
        onEditStation(newStation)
    }

    return (
        <div className="station-edit-modal">
            <div className="edit-details-title">
                <h1>Edit details</h1>
                <button onClick={onCloseStation}>x</button>
            </div>
            <div className="edit-details-container">
                <img className="img-details" src={station.createdBy.imgUrl} alt="" />
                <div className="edit-details-form">
                    <form onSubmit={onSaveStation}>
                        <input value={newStation.name} onChange={handleChange} name="name" id="name" />
                        <button>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}