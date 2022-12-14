import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'

export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function loadLikedSongs() {
    return async (dispatch, getState) => {
        const songs = await userService.getLikedSongs()
        const action = { type: 'SET_LIKED_SONGS', songs }
        dispatch(action)
    }
}

export function addLikedSong(song) {
    return async (dispatch, getState) => {
        let user = getState().userModule.user
        if (!user?.username) {
            userService.addLikedSong(song)
        }
        // } else{
        //     userService.update(user)
        // }
        const action = { type: 'ADD_LIKED_SONG', song }
        await dispatch(action)
        if (user?.username) {
            user = getState().userModule.user
            // ('user :', user)
            userService.update(user)
        }
        // TODO: Add song to user's liked song array
        // dispatch 
    }
}

export function removeLikedSong(song) {
    return async (dispatch, getState) => {
        let user = getState().userModule.user
        if (!user?.username) {
            userService.removeLikedSong(song)
        }
        const action = { type: 'REMOVE_LIKED_SONG', song }
        await dispatch(action)
        if (user?.username) {
            user = getState().userModule.user
            userService.update(user)
        }
        // TODO: Add song to user's liked song array
        // dispatch 
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

export function onLogin(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot login')
            console.log('Cannot login', err)
            throw err
        }
    }
}

export function onSignup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
        } catch (err) {
            showErrorMsg('Cannot signup')
            console.log('Cannot signup', err)
        }

    }
}

export function onLogout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            showErrorMsg('Cannot logout')
            console.log('Cannot logout', err)
        }
    }
}

export function loadUser(userId) {
    return async (dispatch) => {
        try {
            const user = await userService.getById(userId);
            dispatch({ type: 'SET_WATCHED_USER', user })
        } catch (err) {
            showErrorMsg('Cannot load user')
            console.log('Cannot load user', err)
        }
    }
}

