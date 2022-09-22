const initialState = {
    player: null,
    currSongIdx: null,
    isPlayingSong: false
}

export function songReducer(state = initialState, action) {
    let newState = state
    let currSongIdx = state.currSongIdx

    switch (action.type) {
        case 'SET_PLAYER':
            newState = { ...state, player: action.player }
            break
        case 'SET_IS_SONG_PLAYING':
            newState = { ...state, isPlayingSong: action.isPlayingSong }
            break
        case 'SET_NEXT_PREV_SONG':
            const { currStation } = action
            if (currSongIdx + action.diff >= currStation.songs.length) {
                currSongIdx = -1
            }
            else if (currSongIdx + action.diff >= 0 && currSongIdx + action.diff <= currStation.songs.length) {
            } else {
                currSongIdx = currStation.songs.length
            }
            newState = { ...state, currSongIdx: currSongIdx + action.diff }
            break
        case 'SET_CURRENTLY_PLAYING_SONG_IDX':
            newState = { ...state, currSongIdx: action.songIdx }
            break
        default:
    }
    window.stationState = newState
    return newState

}