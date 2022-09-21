// const { createStore, applyMiddleware, combineReducers, compose } = Redux
// const thunk = ReduxThunk.default

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { userReducer } from './user.reducer.js'
import { systemReducer } from './system.reducer'
import { stationReducer } from './station.reducer'
import { songReducer } from './song.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    systemModule: systemReducer,
    stationModule: stationReducer,
    songModule: songReducer,
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();
// Lets wire up thunk and also redux-dev-tools:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// export const store = createStore(rootReducer, applyMiddleware(thunk))


