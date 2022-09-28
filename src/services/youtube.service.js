import axios from "axios"
import { utilService } from "./util.service"

export const youtubeService = {
    getSongs,
    getSongsDetails,
    getSongsDuration,
    getSongDuration
}

const API_KEYS = []

function getSongs(term) {
    const API_KEY = 'AIzaSyBKmZyRd0g8AEKqh9tNR3VNFn4ERzmmoIY'
    return axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}&maxResults=50`)

}
async function getSongsDetails(songs) {
    const API_KEY = 'AIzaSyBKmZyRd0g8AEKqh9tNR3VNFn4ERzmmoIY'
    if (!songs || !songs.length) return null
    const songId = songs.map(song => song.id.videoId)
    console.log(songs[0].snippet.title);
    const songsDetails = axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${songId.join(',')}&part=contentDetails&key=${API_KEY}`)
    console.log(songsDetails)
    let songsDetailsAwait = await Promise.resolve(songsDetails)
    songs.forEach((song, idx) => {
        songsDetailsAwait.data.items[idx].contentDetails.imgUrl = song.snippet.thumbnails.high.url
        songsDetailsAwait.data.items[idx].contentDetails.channelTitle = song.snippet.channelTitle
        return songsDetailsAwait.data.items[idx].contentDetails.title = song.snippet.title
    })
    console.log('songsDetailsAwait', songsDetailsAwait);
    const songDuration = getSongsDuration(songsDetailsAwait)
    let results = songsDetailsAwait?.data?.items.filter((song, idx) => (songDuration[idx] >= 120 && songDuration[idx] <= 480))
    results = results.splice(0, 50)
    return results
}

function getSongsDuration(songs) {
    const details = songs?.data?.items || songs
    const songDuration = []
    details.forEach((detail) => {
        // console.log(detail.contentDetails.duration)
        const dur = detail.contentDetails.duration
        const myRe = /(?<=PT)(.*)(?=H)/g;
        let myReMin
        let myReSec
        let hourTime = 0
        let minTime = 0
        let secTime = 0
        const hours = myRe.exec(dur);
        if (hours) {
            //   console.log('hours', hours[0]) 
            hourTime = (+hours[0]) * 60 * 60
            myReMin = /(?<=H)(.*)(?=M)/g;
        } else {
            myReMin = /(?<=T)(.*)(?=M)/g;
        }
        const minutes = myReMin.exec(dur);
        if (minutes) {
            //   console.log('minutes', minutes[0])
            minTime = +minutes[0] * 60
            myReSec = /(?<=M)(.*)(?=S)/g;
        } else {
            myReSec = /(?<=T)(.*)(?=S)/g;
        }
        const seconds = myReSec.exec(dur);
        if (seconds) {
            secTime = +seconds[0]
            //   console.log('seconds', seconds[0])
        }
        const duration = hourTime + minTime + secTime
        // console.log((utilService.setTimestampToTime(duration)))
        songDuration.push(duration)
    })
    return songDuration
}
function getSongDuration(songDur) {
    const songDuration = []
    const dur = songDur
    const myRe = /(?<=PT)(.*)(?=H)/g;
    let myReMin
    let myReSec
    let hourTime = 0
    let minTime = 0
    let secTime = 0
    const hours = myRe.exec(dur);
    if (hours) {
        hourTime = (+hours[0]) * 60 * 60
        myReMin = /(?<=H)(.*)(?=M)/g;
    } else {
        myReMin = /(?<=T)(.*)(?=M)/g;
    }
    const minutes = myReMin.exec(dur);
    if (minutes) {
        minTime = +minutes[0] * 60
        myReSec = /(?<=M)(.*)(?=S)/g;
    } else {
        myReSec = /(?<=T)(.*)(?=S)/g;
    }
    const seconds = myReSec.exec(dur);
    if (seconds) {
        secTime = +seconds[0]
    }
    const duration = hourTime + minTime + secTime
    songDuration.push(duration)
    return songDuration
}
