import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { StationList } from "../cmps/station-list";
import { stationService } from "../services/station.service";

export function GenreDetails() {
    const params = useParams()
    useEffect(() => {
    }, [])


    const [stations, setStations] = useState(null)

    useEffect(() => {
        loadStations()
    }, [])

    const loadStations = async () => {
        try {
            let newStations = await stationService.query()
            if(params.genre.toUpperCase() === "All".toUpperCase()) return setStations(newStations)
            newStations = newStations.filter(station => {
                for (let i = 0; i < station.tags.length; i++) {
                    if (station.tags[i].toUpperCase() === params.genre.toUpperCase())
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
            {/* <div>{params.genre}</div> */}
            <StationList stations={stations} />
        </div>
    )
}