
import React, { useEffect, useState } from 'react'
import { stationService } from '../services/station.service'
import { StationList } from '../cmps/station-list'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function HomePage() {

    const [hardCodedStations, setHardCodedStations] = useState(null)
    const [bestOfStations, setBestOfStations] = useState(null)
    const [divaStations, setDivaStations] = useState(null)

    let welcomeMsg

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

    const getWelcomeMsg = () => {
        let time = new Date().getHours()

        if (time >= 4 && time <= 11) {
            welcomeMsg = 'Good Morning'
        }
        else if (time >= 12 && time <= 16) {
            welcomeMsg = 'Good Afternoon'
        }
        else if (time >= 17 && time <= 20) {
            welcomeMsg = 'Good Evening'
        } else if (time >= 21 && time <= 23 || time < 3) {
            welcomeMsg = 'Good Night'
        }
        console.log('time :', time)
    }

    if (!hardCodedStations || !bestOfStations || !divaStations) return
    getWelcomeMsg()
    return (
        <div className="app-home main-view">
            <div className="station-list-main-container">{welcomeMsg}</div>
            <StationList stations={hardCodedStations} header={'Hardcoded'} title={'Our Top Playlists'} />
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