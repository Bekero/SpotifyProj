// Guidlines:
// *. currently no better API than youtube...
// *. no need for song store, it is part of the station

// Pages, Cmps:
// HomePage render 2 stations => link StationDetails
// Add station
// AppPlayer (initially rendered at StationDetails, later in footer)
//   Smart component - connected to store:
//   -. stationModule.currentlyPlayingUrl
//   -. stationModule.dispatch(nextSong)
// Filtering
// StationList, StationPreview
// StationDetails - Make it amazing
// D & D Later....
//stationService.getPrimaryTags()

// export const stationData = {
//   getStations
// }

//* Station = Playlist
// var stations = [

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
//     "likedByUsers": ['{minimal-user}', '{minimal-user}'],
//     "songs": [
//       {
//         "id": "s1001",
//         "title": "The Meters - Cissy Strut",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
//         "addedBy": '{minimal-user}',
//         "addedAt": 162521765262
//       },
//       {
//         "id": "mUkfiLjooxs",
//         "title": "The JB's - Pass The Peas",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
//         "addedBy": {}
//       },
//     ],
//     "msgs": [
//       {
//         id: 'm101',
//         from: '{mini-user}',
//         txt: 'Manish?'
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
//     "likedByUsers": ['{minimal-user}', '{minimal-user}'],
//     "songs": [
//       {
//         "id": "s2002",
//         "title": "Laugh Now, Cry Later",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
//         "addedBy": '{minimal-user}',
//         "addedAt": 162521765262
//       },
//       {
//         "id": "mqwiLasdadoxs",
//         "title": "The JB's - Pass The Peas",
//         "url": "youtube/song.mp4",
//         "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
//         "addedBy": {}
//       },
//     ],
//     "msgs": [
//       {
//         id: 'm101',
//         from: '{mini-user}',
//         txt: 'Manish?'
//       }
//     ]
//   }
// ]

// function getStations() {
//   return stations
// }
// const user = {}



//* station[0].id
//* station[0].name
//* station[0].tags[]
//* station[0].createdBy{id, fullname, imgUrl}
//* station[0].likedByUsers[{minimal-user}]
//* station[0].songs[{id, title, url, imgUrl, addedBy,  addedAt}]
//* station[0].msgs[{id,from,txt}]