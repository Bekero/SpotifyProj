
import React, { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { StationList } from '../cmps/station-list'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function HomePage() {
    const [stations, setStations] = useState(null)

    // const notify = () => toast("Hola Ninio");
    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        try {
            let newStations = await stationService.query()
            newStations = newStations.filter(station => !station.isMyStation && !station.isLikedStation)
            setStations(newStations)
        } catch (err) {
            console.log('Cannot get stations :', err)
        }
    }
    if (!stations) return
    return (
        <div className="app-home main-view">
            {/* <button onClick={notify}>Notify!</button> */}

            <StationList stations={stations} />
            <div className="toast-container">
                <ToastContainer
                    position="bottom-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </div>
    )

}