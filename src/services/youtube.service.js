import axios from "axios"

export const youtubeService = {
    getSongs,
    getSongsDetails
}

function getSongs(term) {
<<<<<<< HEAD
    const API_KEY = 'AIzaSyDgbFfLi0LGl6lOJ_0cN4A-lcrS4UtryCU'
    const results = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}&maxResults=10`)
    return Promise.resolve(results)
}
function getSongsDetails(songs) {
    const API_KEY = 'AIzaSyDgbFfLi0LGl6lOJ_0cN4A-lcrS4UtryCU'
=======
    const API_KEY = 'AIzaSyBL-4tgjB8MxfYouEBcUPllZk2u8noV9kM'
    const results = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}/category=Music&maxResults=10`)
    return Promise.resolve(results)
}
function getSongsDetails(songs) {
    const API_KEY = 'AIzaSyBL-4tgjB8MxfYouEBcUPllZk2u8noV9kM'
>>>>>>> acc003b163a5ca9b6785697d25731bac7ff27f5c
    if (!songs || !songs.length) return null
    console.log('songs',songs);
    const songsDetails = songs.map(song => song.id.videoId)
    console.log(songsDetails.join(','));
    const results = axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${songsDetails.join(',')}&part=contentDetails&key=${API_KEY}`)

    return Promise.resolve(results)
}

