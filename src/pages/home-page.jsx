
import React from 'react'
import { stationService } from '../services/station.service'
import { StationList } from '../cmps/station-list'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function HomePage() {
    const notify = () => toast("Hola Ninio");
    let stations = stationService.getStations()

    return (
        <div className="app-home main-view">
            <button onClick={notify}>Notify!</button>

            <StationList stations={stations} />
            <div className="toast-container">
                <ToastContainer
                    position="bottom-center"
                    autoClose={111500}
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