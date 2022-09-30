const onPlayVideo = async () => {
    player.playVideo()
    if (isPlayingSong) return
    await dispatch(setIsPlayingSong(true))
    setPlay(true)
}

const onNextVideo = async () => {
    await dispatch(setNextPrevSong(1))
    setSongTimestamp(0)
}

const onPrevVideo = async () => {
    await dispatch(setNextPrevSong(-1))
    setSongTimestamp(0)
}
export function setNextPrevSong(diff) {
    return (dispatch, getState) => {
        const currStation = getState().stationModule.currStation
        const action = { type: 'SET_NEXT_PREV_SONG', diff, currStation }
        dispatch(action)
    }
}
switch (action.type) {
    case 'SET_NEXT_PREV_SONG':
        const { currStation } = action
        if (currSongIdx + action.diff >= currStation.songs.length) {
            currSongIdx = -1
        }
        else if (currSongIdx + action.diff < 0) {
            currSongIdx = currStation.songs.length
        }
        newState = { ...state, currSongIdx: currSongIdx + action.diff }
        break
    default:
}