import station from '../data/station.json'
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || station
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}

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
                "id": "13eq2rwf",
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

// let stations = [
//   {
//     "_id": "5cksxjas89xjsa8xjsa8jxs09",
//     "name": "Funky Monks",
//     "tags": [
//       "Funk",
//       "Happy"
//     ],
//     "createdBy": {
//       "_id": "u101",
//       "fullname": "Puki Ben David",
//       "imgUrl": "http://some-photo/"
//     },
//     "likedByUsers": [{ 'minimal-user': null }, { 'minimal-user': null }],
//     "songs": [
//       {
//         "id": "12weqdf",
//         "title": "The Meters - Cissy Strut",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
//         "addedBy": { 'minimal-user': null },
//         "addedAt": 162521765262
//       },
//       {
//         "id": "mUkfiLjooxs",
//         "title": "The JBs - Pass The Peas",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
//         "addedBy": {}
//       }
//     ]
//   },
//   {
//     "_id": "5cksxjasasqwesyhdjxs25",
//     "name": "Drake",
//     "tags": [
//       "Funk",
//       "Happy"
//     ],
//     "createdBy": {
//       "_id": "u203",
//       "fullname": "Nuki Shlomo",
//       "imgUrl": "http://some-photo/"
//     },
//     "likedByUsers": [{ 'minimal-user': null }, { 'minimal-user': null }],
//     "songs": [
//       {
//         "id": "s2002",
//         "title": "Laugh Now, Cry Later",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
//         "addedBy": { 'minimal-user': null },
//         "addedAt": 162521765262
//       },
//       {
//         "id": "mqwiLasdadoxs",
//         "title": "The JBs - Pass The Peas",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
//         "addedBy": {}
//       }
//     ]

//   }
//   ]

// ;(() => {
//     _save('station', stations)
// })()