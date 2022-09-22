
export function setPlayer(player) {
    return async (dispatch) => {
        try {
            const action = { type: 'SET_PLAYER', player }
            dispatch(action)
        } catch (err) {
            console.log('Cannot find player', err)
        }
    }
}

export function setNextPrevSong(diff) {
    return (dispatch, getState) => {
        const currStation = getState().stationModule.currStation
        const action = { type: 'SET_NEXT_PREV_SONG', diff, currStation }
        dispatch(action)
    }
}

export function setCurrPlayingSongIdx(songIdx) {
    return (dispatch) => {
        const action = { type: 'SET_CURRENTLY_PLAYING_SONG_IDX', songIdx }
        dispatch(action)
    }
}
export function setIsPlayingSong(isPlayingSong) {
    return (dispatch) => {
        const action = { type: 'SET_IS_SONG_PLAYING', isPlayingSong }
        dispatch(action)
    }
}