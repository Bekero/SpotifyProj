
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionRemoveStation, getActionAddStation, getActionUpdateStation } from '../store/station.actions.js'
import { store } from '../store/store'
import station from '../data/station.json'
import { httpService } from './http.service.js'

const BASE_URL = 'station/'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    getStations,
}

async function query(filterBy) {
    let user = userService.getLoggedinUser()
    let stations = await httpService.get(BASE_URL, { params: filterBy })
    if (!stations.length) return Promise.resolve(station)
    if (filterBy && filterBy.length) {
        stations = stations.filter(station => {
            if (station?.createdBy?._id === user?._id) return //Need to remove it and use the logged in user!!!
            return (station.createdBy.fullname.toUpperCase().includes(filterBy.toUpperCase()) ||
                station.name.toUpperCase().includes(filterBy.toUpperCase()))
        })
    }
    return stations
}

function getById(stationId) {
    return httpService.get(BASE_URL + stationId)

        // .then(stations => stations.find(station => station._id === stationId))
    // return axios.get(`/api/station/${stationId}`)
}

async function remove(stationId) {
    await httpService.delete(BASE_URL, stationId)
    // stationChannel.postMessage(getActionRemoveStation(stationId))
}

async function save(station) {
    let savedStation
    let user = userService.getLoggedinUser()
    if (station._id) {
        savedStation = await httpService.put(BASE_URL + station._id, station)
        console.log(savedStation)
        // * The problomis here after the DB Saving its just makes an array and saves it to the DB and also to the action!
        // stationChannel.postMessage(getActionUpdateStation(savedStation))
    } else {
        if (user) {
            user.artistImg = ''
            station.createdBy = user
        }
        const status = await httpService.post(BASE_URL, station)
        savedStation = {...station, _id: status.insertedId}
        console.log(savedStation)
        // stationChannel.postMessage(getActionAddStation(savedStation))
    }
    return savedStation
}

let stations = [
    {
        "_id": "5cksxxjas89xjsa8xjsa8jxs09",
        "name": "Funky Monks",
        "tags": [
            "Funk",
            "Happy"
        ],
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "http://some-photo5/"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "id": "3ewfd",
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
    },
    {
        "_id": "5cksxjasasqwesyhdjxs25",
        "name": "Drake",
        "tags": [
            "Funk",
            "Happy"
        ],
        "createdBy": {
            "_id": "34g",
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
                "id": "g2332ewrg5434w3e",
                "title": "The JB's - Pass The Peas",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/g2332ewrg5434w3e/mqdefault.jpg",
                "addedBy": {}
            },
        ],
    },
    {
        "_id": "5c124wesyhd123123asds333",
        "name": "Kendrick Lamar",
        "tags": [
            "Funk",
            "Happy"
        ],
        "createdBy": {
            "_id": "1231",
            "fullname": "Nuki Shlomo",
            "imgUrl": "http://some-photo/"
        },
        "likedByUsers": ['{minimal-user}', '{minimal-user}'],
        "songs": [
            {
                "id": "qfw13",
                "title": "Bitch Dont Kill My Vibe",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765262
            },
            {
                "id": "mqwiLasdadoxs",
                "title": "Die Hard",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "addedBy": {}
            },
        ],
    },
    {
        "_id": "5qewaf2grbrw45we",
        "name": "Jack Harlow",
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
                "id": "adwq13eg13",
                "title": "First Class",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/adwq13eg13/mqdefault.jpg",
                "addedBy": '{minimal-user}',
                "addedAt": 162521765262
            },
            {
                "id": "asdwwge12nts",
                "title": "Flika Mora",
                "url": "youtube/song.mp4",
                "imgUrl": "https://i.ytimg.com/vi/asdwwge12nts/mqdefault.jpg",
                "addedBy": {}
            },
        ],
    }
]

function getStations() {
    return stations
}

function getEmptyStation() {
    const user = userService.getLoggedinUser()
    return {
        name: 'My Playlist #' + utilService.getRandomIntInclusive(1, 9),
        songs: [],
        tags: [],
        likedByUsers: [],
        createdBy: {
            // username: null,
            _id: user?._id,
            fullname: null,
            // isMyStation: true
            artistImg: ''
        }
    }
}

// TEST DATA
// storageService.post(BASE_URL, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))