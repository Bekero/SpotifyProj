const initialState = {
    stations: [],
    likedSongsStation: null,
    currStation: null,
    lastRemovedStation: null,
}

export function stationReducer(state = initialState, action) {
    let newState = state
    let stations
    let newStations
    let likedStationIdx
    let existLikedStation

    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_STATION':
            console.log(action.station)
            newState = { ...state, currStation: action.station }
            console.log(newState)
            break
        case 'REMOVE_STATION':
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            newStations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations: newStations, lastRemovedStation }
            break
        case 'ADD_STATION':
            likedStationIdx = state.stations.findIndex(station => station._id === action.savedStation._id)
            existLikedStation = state.stations.filter(station => station._id === action.savedStation._id)
            if (existLikedStation[0]) {
                newState = { ...state, stations: [...state.stations[likedStationIdx], existLikedStation[0]] }
                break
            }
            newState = { ...state, stations: [...state.stations, action.savedStation] }
            break
        case 'ADD_LIKED_STATION':
            likedStationIdx = state.stations.findIndex(station => station._id === action.savedStation._id)
            if (likedStationIdx !== -1) {
                newState = { ...state, stations: [...state.stations[likedStationIdx], existLikedStation[0]] }
                break
            }
            newState = { ...state, stations: [...state.stations, action.savedStation] }
            break
        case 'ADD_SONG_TO_LIKED_PLAYLIST':
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case 'UPDATE_PLAYLIST':
            stations = state.stations.filter(station => station._id !== action.updatedStation._id)
            newState = { ...state, stations: [...stations, action.updatedStation] }
            break
        case 'UPDATE_STATION':
            stations = state.stations.map(station => (station?._id === action.station?._id) ? action.station : station)
            newState = { ...state, stations }
            break
        case 'UNDO_REMOVE_STATION':
            if (state.lastRemovedStation) {
                newState = { ...state, stations: [...state.stations, state.lastRemovedStation], lastRemovedStation: null }
            }
            break
        default:
    }
    window.stationState = newState
    return newState

}