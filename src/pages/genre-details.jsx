import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { StationList } from "../cmps/station-list";
import { stationService } from "../services/station.service";

export function GenreDetails() {
    const params = useParams()
    useEffect(() => {
        console.log(params.genre);
    }, [])


    const [stations, setStations] = useState(null)

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        try {
            let newStations = await stationService.query()
            newStations = newStations.filter(station => {
                for (let i = 0; i < station.tags.length; i++) {
                    if (station.tags[i] === params.genre)
                        return station
                }
            })
            // newStations = newStations.filter(station => !station.isMyStation && !station.isLikedStation)
            setStations(newStations)
        } catch (err) {
            console.log('Cannot get stations :', err)
        }
    }
    if (!stations) return
    return (
        <div>
            <h2>Hello from Genre details</h2>
            <StationList stations={stations} />
        </div>
    )
}