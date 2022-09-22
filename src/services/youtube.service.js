import axios from "axios"

export const youtubeService = {
    getSongs,
    getSongsDetails
}

function getSongs(term) {
    const API_KEY = 'AIzaSyBr1mdcHQysA9H4S6olFuBuEu8I2HdJm5Y'
    const results = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}/category=Music&maxResults=10`)
    return Promise.resolve(results)
}
function getSongsDetails(songs) {
    const API_KEY = 'AIzaSyBr1mdcHQysA9H4S6olFuBuEu8I2HdJm5Y'
    if (!songs || !songs.length) return null
    const songsDetails = songs.map(song => song.id.videoId)
    const results = axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${songsDetails.join(',')}&part=contentDetails&key=${API_KEY}`)
  

    return Promise.resolve(results)
}

