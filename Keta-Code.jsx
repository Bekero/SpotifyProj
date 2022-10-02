// Keta code


// Cmp
const onChangeSong = async (diff) => {
    await dispatch(changeSong(diff))
    setSongTimestamp(0)
}

// Action
function changeSong(diff) {
    return (dispatch, getState) => {
        const currStation = getState().stationModule.currStation
        const action = { type: 'SET_CHANGE_SONG', diff, currStation }
        dispatch(action)
    }
}

// Reducer
switch (action.type) {
    case 'SET_CHANGE_SONG':
        const { currStation, diff } = action
        if (currSongIdx + diff >= currStation.songs.length) {
            currSongIdx = -1
        }
        else if (currSongIdx + diff < 0) {
            currSongIdx = currStation.songs.length
        }
        return { ...state, currSongIdx: currSongIdx + diff }
}


