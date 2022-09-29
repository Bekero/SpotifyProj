import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
}
export function userReducer(state = initialState, action) {
    var newState = state;
    let likedSongs = state?.user?.likedSongs


    switch (action.type) {

        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_LIKED_SONGS':
            // if (!state.user) {
            newState = { ...state, user: { ...state.user, likedSongs: action.songs } }
            // }
            // else {
            //     newState = { ...state, user: {...state.user, likedSongs: [action.songs] }}
            // }
            break
        case 'ADD_LIKED_SONG':
            newState = { ...state, user: { ...state.user, likedSongs: [...state.user?.likedSongs, action.song] } }
            break
        case 'REMOVE_LIKED_SONG':
            likedSongs = likedSongs.filter(song => song.id !== action.song.id)
            newState = { ...state, user: { ...state.user, likedSongs: likedSongs } }
            // newState = { ...state, user: { ...state.user, likedSongs: [state.user.likedSongs.filter(song => song.id !== action.song.id)] } }
            break
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;

        default:
    }
    // For debug:
    // window.userState = newState;
    return newState;

}
