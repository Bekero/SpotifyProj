
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveStation, getActionAddStation, getActionUpdateStation } from '../store/station.actions.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs 

const STORAGE_KEY = 'station'
const stationChannel = new BroadcastChannel('stationChannel')

    ; (() => {
        stationChannel.addEventListener('message', (ev) => {
            store.dispatch(ev.data)
        })
    })()

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    getStations,
}
window.cs = stationService
let stations = [

    {
        "_id": "5cksxjas89xjsa8xjsa8jxs09",
        "name": "Funky Monks",
        "tags": [
            "Funk",
            "Happy"
        ],
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "http://some-photo/"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "id": "s1001",
                "title": "The Meters - Cissy Strut",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765262
            },
            {
                "id": "mUkfiLjooxs",
                "title": "The JB's - Pass The Peas",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "addedBy": {}
            },
        ],
        "msgs": [
            {
                id: 'm101',
                from: '{mini-user}',
                txt: 'Manish?'
            }
        ]
    },

    {
        "_id": "5cksxjasasqwesyhdjxs25",
        "name": "Drake",
        "tags": [
            "Funk",
            "Happy"
        ],
        "createdBy": {
            "_id": "u203",
            "fullname": "Nuki Shlomo",
            "imgUrl": "http://some-photo/"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "id": "s2002",
                "title": "Laugh Now, Cry Later",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765262
            },
            {
                "id": "mqwiLasdadoxs",
                "title": "The JB's - Pass The Peas",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "addedBy": {}
            },
        ],
        "msgs": [
            {
                id: 'm101',
                from: '{mini-user}',
                txt: 'Manish?'
            }
        ]
    }
]

function getStations() {
    return stations
}
const user = {}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
    // return axios.get(`/api/station/${stationId}`)
}

async function remove(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
    stationChannel.postMessage(getActionRemoveStation(stationId))
}

async function save(station) {
    var savedStation
    console.log(station);
    if (station._id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
        stationChannel.postMessage(getActionUpdateStation(savedStation))

    } else {
        // Later, owner is set by the backend
        // station.owner = userService.getLoggedinUser()
        savedStation = await storageService.post(STORAGE_KEY, station)
        stationChannel.postMessage(getActionAddStation(savedStation))
    }
    return savedStation
}

function getEmptyStation() {
    return {
        name: 'My Playlist #' + utilService.getRandomIntInclusive(1, 9),
        songs: [],
        tags:[],
        likedByUsers:[],
        createdBy:{
            fullname: null,
            imgUrl: null
        }
    }
}



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




