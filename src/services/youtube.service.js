import axios from "axios"

export const youtubeService = {
    getSongs,
    getSongsDetails,
    getSongsDuration,
    getSongDuration
}

const API_KEYS = [

]
var gApisCounter = 0

async function getSongs(term) {
    const API_KEY = API_KEYS[gApisCounter]
    try {
        return await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}&maxResults=50`)
    } catch (e) {
        if (gApisCounter === API_KEYS.length - 1) {
            gApisCounter = 0
        }
        gApisCounter++
        return await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${term}&maxResults=50`)
    }
}

async function getSongsDetails(songs) {
    const API_KEY = ''
    if (!songs || !songs.length) return null
    const songId = songs.map(song => song.id.videoId)
    const songsDetails = axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${songId.join(',')}&part=contentDetails&key=${API_KEY}`)
    let songsDetailsAwait = await Promise.resolve(songsDetails)
    songs.forEach((song, idx) => {
        songsDetailsAwait.data.items[idx].contentDetails.imgUrl = song.snippet.thumbnails.high.url
        songsDetailsAwait.data.items[idx].contentDetails.channelTitle = song.snippet.channelTitle
        return songsDetailsAwait.data.items[idx].contentDetails.title = song.snippet.title
    })
    const songDuration = getSongsDuration(songsDetailsAwait)
    let results = songsDetailsAwait?.data?.items.filter((song, idx) => (songDuration[idx] >= 120 && songDuration[idx] <= 480))
    results = results.splice(0, 10)
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
