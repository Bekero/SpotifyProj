import { userService } from "../services/user.service.js";
import { storageService } from "../services/async-storage.service.js";
import { stationService } from "../services/station.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

// Action Creators:
export function getActionRemoveStation(stationId) {
    return {
        type: 'REMOVE_STATION',
        stationId
    }
}

export async function getActionAddStation(savedStation) {
    return {
        type: 'ADD_STATION', savedStation
    }
}

export function getActionUpdateStation(station) {
    return {
        type: 'UPDATE_STATION',
        station
    }
}

export function loadStations(filterBy = null) {
    return async (dispatch) => {
        try {
            const stations = await stationService.query(filterBy)
            // console.log('Stations from DB:', stations)
            dispatch({
                type: 'SET_STATIONS',
                stations
            })

        } catch (err) {
            showErrorMsg('Cannot load stations')
            console.log('Cannot load stations', err)
        }
    }
}

// export function loadLikedStation() {
//     return async (dispatch) => {
//         try {
//             const stations = await stationService.query()
//             let station= stations.filter(station => station.isLikedStation === true)
//             console.log('station :', station)
//             // stations.filter(station => return station)
//             // console.log('Stations from DB:', stations)
//             dispatch({
//                 type: 'SET_STATIONS',
//                 stations
//             })

//         } catch (err) {
//             showErrorMsg('Cannot load stations')
//             console.log('Cannot load stations', err)
//         }
//     }
// }

export function setCurrStation(stationId) {
    return async (dispatch) => {
        try {
            const station = await stationService.getById(stationId)
            const action = { type: 'SET_CURR_STATION', station }
            dispatch(action)
        } catch (err) {
            console.log('Cannot find currently station', err)
        }
    }
}

export function removeStation(stationId) {
    return async (dispatch) => {
        try {
            await stationService.remove(stationId)
            console.log('Deleted Succesfully!');
            dispatch(getActionRemoveStation(stationId))
            showSuccessMsg('Station removed')
        } catch (err) {
            showErrorMsg('Cannot remove station')
            console.log('Cannot remove station', err)
        }
    }
}


export function addStation(currStation) {

    return async (dispatch, getState) => {
        if (currStation.isLikedStation) {
            let stations = getState().stationModule.stations
            let likedStation = stations.filter(station => station.isLikedStation === true)
            if (likedStation.length) {
                currStation = likedStation[0]
                return currStation
            }
        }
        try {
            const savedStation = await stationService.save(currStation)
            const action = { type: 'ADD_STATION', savedStation }
            dispatch(action)
            showSuccessMsg('Station added')
        }
        catch (err) {
            showErrorMsg('Cannot add station')
            console.log('Cannot add station', err)
        }
    }
}

export function addSongToMyPlaylist(wantedSong, myPlaylistId) {
    return async (dispatch, getState) => {
        console.log('myPlaylistId', myPlaylistId);
        let stations = getState().stationModule.stations
        let currStation = getState().stationModule.currStation
        let myStation
        if (!myPlaylistId) {
            myStation = currStation
        } else {
            myStation = stations.find(station => station._id === myPlaylistId)
        }
        let checkIfLikedSongExist = myStation.songs.find(song => song.id === wantedSong.id)
        if (checkIfLikedSongExist) return
        myStation.songs.push(wantedSong)
        console.log(myStation);
        const updatedStation = await stationService.save(myStation)
        const action = { type: 'UPDATE_STATION', updatedStation }
        dispatch(action)
    }
}

// export function addSongToMyPlaylist(wantedSong, myPlaylistId) {
//     return async (dispatch, getState) => {
//         console.log('myPlaylistId', myPlaylistId);
//         let stations = getState().stationModule.stations
//         let myLikedStation = structuredClone(stations.find(station => station.isLikedStation === true))
//         let checkIfLikedSongExist = myLikedStation.songs.find(song => song.id === wantedSong.id)
//         if (checkIfLikedSongExist) return
//         wantedSong.isLiked = true
//         myLikedStation.songs.push(wantedSong)
//         const updatedStation = await stationService.save(myLikedStation)
//         const action = { type: 'UPDATE_PLAYLIST', updatedStation }
//         dispatch(action)
//     }
// }

export function removeLikedSongFromMyPlaylist(wantedSong, myPlaylistId) {
    return async (dispatch, getState) => {
        let stations = getState().stationModule.stations
        let likedStation = structuredClone(stations.find(station => station.isLikedStation === true))
        likedStation.songs.filter(song => song.isLiked === true)
        //*Need to update all the stations that the song is there bcs isLiked has been changed
        // let stationsWithCurrLikedSong = structuredClone(stations.filter(station => station.songs.find(song => song.id === wantedSong.id)))
        // console.log(stationsWithCurrLikedSong)
        // stationsWithCurrLikedSong.map(station => station.songs.map(song => { if (song.id === wantedSong.id) { song.isLiked = false } }))
        const updatedStation = await stationService.save(likedStation)
        const action = { type: 'UPDATE_PLAYLIST', updatedStation }
        dispatch(action)
    }
}

// export function addSongLikedPlaylist(wantedSong) {
//     return (dispatch) => {
//         const action = { type: 'ADD_SONG_TO_LIKED_PLAYLIST', wantedSong }
//         dispatch(action)
//     }
// }

export function updateStation(station) {
    return (dispatch) => {
        stationService.save(station)
            .then(savedStation => {
                dispatch(getActionUpdateStation(savedStation))
                showSuccessMsg('Station updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update station')
                console.log('Cannot save station', err)
            })
    }
}

// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveStationOptimistic(stationId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_STATION',
            stationId
        })
        showSuccessMsg('Station removed')

        stationService.remove(stationId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove station')
                console.log('Cannot load stations', err)
                dispatch({
                    type: 'UNDO_REMOVE_STATION',
                })
            })
    }
}