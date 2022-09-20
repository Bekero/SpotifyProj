import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    users: [],

}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {

        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'SET_LIKED_SONGS':
            console.log(state)
            if (!state.user) {
                console.log('no user')
                newState = { ...state, user: { likedSongs: action.songs } }
                console.log(newState)
            }
            else newState = { ...state, user: { ...state.user, likedSongs: action.songs } }
            break
        case 'ADD_LIKED_SONG':
            newState = {...state, user: {...state.user, likedSongs: [...state.user.likedSongs, action.song]}}
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
    // console.log('State:', newState);
    return newState;

}
