const initialState = {
    stations: [],
    currStation: {},
    currSongIdx: null,
    lastRemovedStation: null,
    currentlyPlayingUrl: null
}

export function stationReducer(state = initialState, action) {
    let newState = state
    let stations
    let myWantedPlaylist
    let wantedPlaylistIdx
    let currStation = state.currStation
    let newStations
    let currentlyPlayingUrl
    let currSongIdx = state.currSongIdx

    switch (action.type) {
        case 'SET_CURRENTLY_PLAYING_URL':
            currentlyPlayingUrl = currStation.songs[action.songIdx].url
            newState = { ...state, currentlyPlayingUrl }
            break
        case 'SET_NEXT_PREV_SONG':
            currentlyPlayingUrl = currStation.songs[currSongIdx + action.diff].url
            newState = { ...state, currentlyPlayingUrl, currSongIdx: currSongIdx + action.diff }
            break
        case 'SET_CURRENTLY_PLAYING_SONG_IDX':
            newState = { ...state, currSongIdx: action.songIdx }
            break
        case 'SET_STATIONS':
            newState = { ...state, stations: action.stations }
            break
        case 'SET_CURR_STATION':
            newState = { ...state, currStation: action.station }
            break
        case 'REMOVE_STATION':
            const lastRemovedStation = state.stations.find(station => station._id === action.stationId)
            newStations = state.stations.filter(station => station._id !== action.stationId)
            newState = { ...state, stations: newStations, lastRemovedStation }
            break
        case 'ADD_STATION':
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case 'ADD_SONG_TO_LIKED_PLAYLIST':
            newState = { ...state, stations: [...state.stations, action.station] }
            break
        case 'ADD_SONG_TO_MY_PLAYLIST':
            myWantedPlaylist = state.stations.find(station => station._id === action.stuff.myPlaylistId)
            myWantedPlaylist = {...myWantedPlaylist, songs: [...myWantedPlaylist.songs, action.stuff.wantedSong]}
            wantedPlaylistIdx = state.stations.findIndex(station => station._id === myWantedPlaylist._id)
            const stations = state.stations.filter(station => station._id !== myWantedPlaylist._id)
            newState = {...state, stations: [...stations, myWantedPlaylist]}
            // return {...state, state.stations[wantedPlaylistIdx].songs: [...songs, action.stuff.wantedSong] }
            // newState = { ...state,  state.stations[wantedPlaylistIdx].songs: [...state.stations[wantedPlaylistIdx].songs, action.stuff.wantedSong] }
            // newState = { ...state, newState }
            console.log('newState :', newState)
            // newState = { ...state, currStation: myWantedPlaylist.songs.push(action.stuff.song) }
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

//* stations[]