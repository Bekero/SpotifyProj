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

export function getActionSetCurrStation(station) {
    return {
        type: 'SET_CURR_STATION',
        station
    }
}

export async function getActionAddStation(savedStation) {
    return {
        type: 'ADD_STATION', savedStation
    }
}

export function getActionSetCurrUrl(songIdx) {
    return {
        type: 'SET_CURRENTLY_PLAYING_URL',
        songIdx
    }
}

export function getActionSetCurrSongIdx(songIdx) {
    return {
        type: 'SET_CURRENTLY_PLAYING_SONG_IDX',
        songIdx
    }
}

// export function getActionSetNextSong(diff) {
//     return {
//         type: 'SET_NEXT_PREV_SONG',
//         diff
//     }
// }

export function getActionUpdateStation(station) {
    return {
        type: 'UPDATE_STATION',
        station
    }
}

export function loadStations() {
    return async (dispatch) => {
        try {
            const stations = await stationService.query()
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
            dispatch(getActionSetCurrStation(station))
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

// export function addUpdatedLikedStation(wantedSong) {
//     return async (dispatch, getState) => {
//         let stations = getState().stationModule.stations
//         let myWantedLikedStation = stations.filter(station => station.isLikedStation === true)
//         // console.log('myWantedLikedStation :', myWantedLikedStation[0])
//         // console.log('stations :', stations)
//         if (!myWantedLikedStation || !myWantedLikedStation.length) return
//         // console.log('myWantedLikedStation :', myWantedLikedStation)
//         stations = stations.filter(station => station._id !== myWantedLikedStation[0]._id)
//         myWantedLikedStation[0].songs.push(wantedSong)
//         try {
//             const savedStation = await stationService.save(myWantedLikedStation)
//             //* When station._id is true it adds owner and ID to the station and keep render another [{likedStation}, owner: asd, id"asdasd"]
//             const action = { type: 'ADD_LIKED_STATION', savedStation }
//             dispatch(action)
//             showSuccessMsg('Station added')
//         }
//         catch (err) {
//             showErrorMsg('Cannot add station')
//             console.log('Cannot add station', err)
//         }
//     }
// }

// export function addUpdatedLikedStation(likedStation) {
//     return async (dispatch, getState) => {
//         try {
//             let stations = getState().stationModule.stations
//             let likedSongsStationState = getState().stationModule.likedSongsStation
//             let myWantedLikedStation = stations.filter(station => station.isLikedStation === true)
//             stations = stations.filter(station => station._id !== myWantedLikedStation._id)
//             //!                     ****
//             console.log('myWantedLikedStation :', myWantedLikedStation.songs)
//             console.log('myWantedLikedStation :', likedStation.songs)

//             // const savedStation = await stationService.save(likedStation)
//             // const action = { type: 'ADD_LIKED_STATION', savedStation }
//             // await dispatch(action)
//             // showSuccessMsg('Station added')
//         }
//         catch (err) {
//             showErrorMsg('Cannot add station')
//             console.log('Cannot add station', err)
//         }
//     }
// }

export function setCurrSongIsPlaying(isPlaying) {
    return (dispatch) => {
        const action = { type: 'SET_SONG_IS_PLAYING', isPlaying }
        dispatch(action)
    }
}
export function setNextPrevSong(diff) {
    return (dispatch) => {
        const action = { type: 'SET_NEXT_PREV_SONG', diff }
        dispatch(action)
    }
}

export function setCurrPlayingSongIdx(songIdx) {
    return (dispatch) => {
        dispatch(getActionSetCurrSongIdx(songIdx))
    }
}

export function setCurrPlayingUrl(songIdx) {
    return (dispatch) => {
        dispatch(getActionSetCurrUrl(songIdx))
    }
}

export function setCurrPlayingSong(songIdx) {
    return (dispatch) => {
        const action = { type: 'SET_CURRENTLY_PLAYING_SONG', songIdx }
        dispatch(action)
    }
}
export function setCurrPlayingUrlFromSearch(url) {
    return (dispatch) => {
        const action = { type: 'SET_CURRENTLY_PLAYING_URL_FROM_SEARCH', url }
        dispatch(action)
    }
}

export function addSongToMyPlaylist(wantedSong, myPlaylistId) {
    return async (dispatch, getState) => {
        let stations = getState().stationModule.stations
        let myLikedStation = structuredClone(stations.find(station => station.isLikedStation === true))
        let checkIfLikedSongExist = myLikedStation.songs.find(song => song.id === wantedSong.id)
        if (checkIfLikedSongExist) return
        wantedSong.isLiked = true
        myLikedStation.songs.push(wantedSong)
        const updatedStation = await stationService.save(myLikedStation)
        const action = { type: 'ADD_UPDATED_PLAYLIST_TO_STATIONS', updatedStation }
        dispatch(action)
    }
}

export function removeLikedSongFromMyPlaylist(wantedSong, myPlaylistId) {
    return async (dispatch, getState) => {
        let stations = getState().stationModule.stations
        let likedStation = structuredClone(stations.find(station => station.isLikedStation === true))
        likedStation.songs.filter(song => song.isLiked === true)
        console.log('likedStation :', likedStation)
        //*Need to update all the stations that the song is there bcs isLiked has been changed
        // let stationsWithCurrLikedSong = structuredClone(stations.filter(station => station.songs.find(song => song.id === wantedSong.id)))
        // stationsWithCurrLikedSong.map(station => station.songs.map(song => { if (song.id === wantedSong.id) { song.isLiked = false } }))
        const updatedStation = await stationService.save(likedStation)
        const action = { type: 'ADD_UPDATED_PLAYLIST_TO_STATIONS', updatedStation }
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

// export function addToStationt(station) {
//     return (dispatch) => {
//         dispatch({
//             type: 'ADD_TO_STATIONT',
//             station
//         })
//     }
// }

// export function removeFromStationt(stationId) {
//     return (dispatch) => {
//         dispatch({
//             type: 'REMOVE_FROM_STATIONT',
//             stationId
//         })
//     }
// }

// export function checkout() {
//     return async (dispatch, getState) => {
//         try {
//             const state = getState()
//             const total = state.stationModule.stationt.reduce((acc, station) => acc + station.price, 0)
//             const score = await userService.changeScore(-total)
//             dispatch({ type: 'SET_SCORE', score })
//             dispatch({ type: 'CLEAR_STATIONT' })
//             showSuccessMsg('Charged you: $' + total.toLocaleString())
//         } catch (err) {
//             showErrorMsg('Cannot checkout, login first')
//             console.log('StationActions: err in checkout', err)
//         }
//     }
// }


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