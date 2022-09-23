import axios from "axios"

export const youtubeService = {
    getSongs,
    getSongsDetails
}

function getSongs(term) {
    const API_KEY = 'AIzaSyBL-4tgjB8MxfYouEBcUPllZk2u8noV9kM'
    const results = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}/category=Music&maxResults=10`)
    return Promise.resolve(results)
}
function getSongsDetails(songs) {
    const API_KEY = 'AIzaSyBL-4tgjB8MxfYouEBcUPllZk2u8noV9kM'
    if (!songs || !songs.length) return null
    const songsDetails = songs.map(song => song.id.videoId)
    const results = axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${songsDetails.join(',')}&part=contentDetails&key=${API_KEY}`)
  

    return Promise.resolve(results)
}

