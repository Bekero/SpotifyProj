import axios from "axios"

export const youtubeService ={
    getSongs
}

function getSongs(term){
    const API_KEY = 'AIzaSyBL-4tgjB8MxfYouEBcUPllZk2u8noV9kM'
    const results = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}/category=Music&maxResults=10`)

    return Promise.resolve(results)
}

