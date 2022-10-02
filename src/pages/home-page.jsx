
import React, { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { StationList } from '../cmps/station-list'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function HomePage() {
    const [hardCodedStations, setHardCodedStations] = useState(null)
    const [bestOfStations, setBestOfStations] = useState(null)
    const [divaStations, setDivaStations] = useState(null)

    // const notify = () => toast("Hola Ninio");
    useEffect(() => {
        loadHardCodedStations()
        loadBestOfStations()
        loadDivaStations()
    }, [])

    const loadHardCodedStations = async () => {
        try {
            let newStations = await stationService.query()
            newStations = newStations.filter(station => {
                for (let i = 0; i < station?.tags?.length; i++) {
                    if (station.tags[i].toUpperCase() === 'HardCoded'.toUpperCase())
                        return station
                }
            })
            setHardCodedStations(newStations)
        } catch (err) {
            console.log('Cannot get stations :', err)
        }
    }

    const loadBestOfStations = async () => {
        try {
            let newStations = await stationService.query()
            newStations = newStations.filter(station => {
                for (let i = 0; i < station?.tags?.length; i++) {
                    if (station.tags[i].toUpperCase() === 'BestOf'.toUpperCase())
                        return station
                }
            })
            setBestOfStations(newStations)
        } catch (err) {
            console.log('Cannot get stations :', err)
        }
    }
    const loadDivaStations = async () => {
        try {
            let newStations = await stationService.query()
            newStations = newStations.filter(station => {
                for (let i = 0; i < station?.tags?.length; i++) {
                    if (station.tags[i].toUpperCase() === 'Diva'.toUpperCase())
                        return station
                }
            })
            setDivaStations(newStations)
        } catch (err) {
            console.log('Cannot get stations :', err)
        }
    }

    if (!hardCodedStations || !bestOfStations || !divaStations) return
    return (
        <div className="app-home main-view">
            <StationList stations={hardCodedStations} header={'Hardcoded'} title={'Good Afternoon'} />
            <StationList stations={bestOfStations} header={'BestOf'} title={'Best One\'s'} />
            <StationList stations={divaStations} header={'More of Divas'} title={'Queens 👑 '} />
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