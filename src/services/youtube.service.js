import axios from "axios"

export const youtubeService ={
    getSongs
}

function getSongs(term){
    const results = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyAFrAR6iDbgflVG1uFigdzvprGqeOXj70A&q=${term}/category=Music&maxResults=10`)

    return Promise.resolve(results)
}

