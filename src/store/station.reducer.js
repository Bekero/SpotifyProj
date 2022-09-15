const initialState = {
    stations: [],
    lastRemovedStation: null
}
export function stationReducer(state = initialState, action) {
    var newState = state
    var stations
    switch (action.type) {
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'REMOVE_STATION':
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            stations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations, lastRemovedStation }
            break
        case 'ADD_STATION':
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case 'UPDATE_STATION':
            stations = state.stations.map(station => (station._id === action.station._id) ? action.station : station)
            newState = { ...state, stations }
            break
        case 'UNDO_REMOVE_STATION':
            if (state.lastRemovedStation) {
                newState = { ...state, stations: [...state.stations, state.lastRemovedStation], lastRemovedStation: null }
            }
            break
        default:
    }
    // For debug:
    window.stationState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}
