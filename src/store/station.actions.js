import { stationService } from "../services/station.service.js";
import { userService } from "../services/user.service.js";
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

export function getActionAddStation(station) {
    return {
        type: 'ADD_STATION',
        station
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

export function getActionSetNextSong() {
    return {
        type: 'SET_NEXT_SONG',
        
    }
}

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
            console.log('Stations from DB:', stations)
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

export function addStation(station) {
    return (dispatch) => {
        console.log(station);

        stationService.save(station)
            .then(savedStation => {
                console.log('Added Station', savedStation);
                dispatch(getActionAddStation(savedStation))
                showSuccessMsg('Station added')
            })
            .catch(err => {
                showErrorMsg('Cannot add station')
                console.log('Cannot add station', err)
            })
    }
}

export function setNextSong() {
    return (dispatch) => {
        dispatch(getActionSetNextSong())
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

export function updateStation(station) {
    return (dispatch) => {
        stationService.save(station)
            .then(savedStation => {
                console.log('Updated Station:', savedStation);
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