import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextPrevSong } from '../store/station.actions';
// import play from '../assets/img/play.png'
// import stop from '../assets/img/stop.png'
// import stop from '../assets/img/stop-song.svg'
import Stop from './svg/stop-song-svg'
// import Play from '../assets/img/play-song.svg'
import Play from './svg/play-song-svg'
import Next from './svg/next-song-svg'
import Prev from './svg/prev-song-svg'
import VolumeOn from './svg/volume-off-svg'
import VolumeOff from './svg/volume-on-svg'
import { utilService } from '../services/util.service';

// import next from '../assets/img/next-song.svg'
// import prev from '../assets/img/prev-song.svg'
// import unmute from '../assets/img/volume-on.svg'
// import mute from '../assets/img/volume-off.svg'
//* setShuffle() , getPlaylist() , getDuration()
//* React-Toastify
//* Google API you user search
//* react beautiful d&d

export function MediaPlayer() {

    const [player, setPlayer] = useState(null)
    const [playSong, setPlay] = useState(false)
    const [songVolume, setSongVolume] = useState(50)
    const [isSongMuted, setSongMuted] = useState(false)
    const [videoTitle, setVideoTitle] = useState('')
    const [songDuration, setSongDuration] = useState(0)
    const [songStartFrom, setSongStartFrom] = useState(0)
    const [songCurrentTimePlaying, setSongCurrentTimePlaying] = useState(0)
    const [songTimestamp, setSongTimestamp] = useState(0)
    const currentlyPlayingUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    const dispatch = useDispatch()
    const intervalRef = useRef()
    // const [songVol, handleChange, setSongVol] = useForm({
    //     name: '',
    //     price: ''
    // })

    useEffect(() => {
        if (!player) return
        console.log(songDuration);
        console.log('player', player);
        setPlay(true)
        setVideoTitle(player.videoTitle)
        if (!songDuration) {
            setSongDuration(player.getDuration())
        }
    }, [player, currentlyPlayingUrl, songDuration, songStartFrom])

    useEffect(() => {
        console.log('got to useeffect')
        console.log(playSong)
        if (playSong) {
            intervalRef.current = setInterval(() => {
                setSongTimestamp((prevTimestamp) => prevTimestamp + 1)
            }, 1000)
        }
        if (!playSong) {
            console.log('clearinterval')
            clearInterval(intervalRef.current)
        }

    }, [playSong])

    useEffect(() => {
        if (!player) return
        setSongStartFrom(player.getCurrentTime())
        window.player = player
        // setInterval(() => {
        //     setSongStartFrom(songCurrentTimePlaying + 1)
        // }, 1000)
    }, [player])

    const videoOnReady = (event) => {
        event.target.pauseVideo()
    }

    const onReadyVideo = async (event) => {
        setPlayer(event.target)
        // player.playVideo()
        // if (!player) return
        setSongDuration(event.target.getDuration())
        // setPlay(true)
        // console.log(player);
        // console.log(player);
        // setVideoTitle(player.videoTitle)
        // player.setVolume(50)
    }

    const onPauseVideo = (ev) => {
        player.pauseVideo()
        setPlay(false)
    }

    const onPlayVideo = () => {
        player.playVideo()
        setPlay(true)
    }

    const onNextVideo = () => {
        dispatch(setNextPrevSong(1))
    }
    const onPrevVideo = () => {
        dispatch(setNextPrevSong(-1))
    }

    const onMuteVideo = () => {
        setSongVolume(player.getVolume())
        setSongMuted(true)
        player.setVolume(0)
    }

    const onSetVolumeVideo = () => {
        player.setVolume(songVolume)
        setSongMuted(false)
        // player.seekTo(50)
    }

    const handleSongVolume = (ev) => {
        const songVol = +ev.target.value
        player.setVolume(songVol)
        setSongMuted(songVol === 0 ? true : false)
    }

    const handleSongStartFrom = (ev) => {
        onPlayVideo()
        const songStartFromValue = +ev.target.value
        setSongTimestamp(songStartFromValue)
        player.seekTo(songStartFromValue)
        setSongStartFrom(songStartFromValue)
    }

    const opts = {
        height: '0',
        width: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            currentlyPlayingUrl,
            autoplay: 1,
        },
    };

    return <div className='media-player-container'>
        <div className='media-player-video-desc'>
            {videoTitle && <h3>{videoTitle}</h3>}
        </div>
        <div className='media-player-action'>
            <div className='media-player-btn-action'>
                <div className='player-control-left'>
                    <button disabled={currentlyPlayingUrl ? false : true} onClick={onPrevVideo}><Prev /></button>
                </div>
                {playSong ? <button className='media-player-play-stop-btn' disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}><Stop /></button> :
                    <button className='media-player-play-stop-btn' disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}><Play /></button>}
                <div className='player-control-right'>
                    <button disabled={currentlyPlayingUrl ? false : true} onClick={onNextVideo}><Next /></button>
                </div>
            </div>
            <div className='song-timestamp flex align-center'>
                <div className='song-timestamp-left'>{songTimestamp ? utilService.setTimestampToTime(songTimestamp) : '00:00'}</div>
                <input type="range" value={songTimestamp} disabled={currentlyPlayingUrl ? false : true} onChange={(ev) => handleSongStartFrom(ev)} min="0" max={songDuration.toString()} step="1" name="duration" id="duration" />
                <div className='song-timestamp-right'>{utilService.setTimestampToTime(songTimestamp)}</div>
            </div>
        </div>
        <div className='media-player-video-settings'>
            {(isSongMuted) ? <button disabled={currentlyPlayingUrl ? false : true} onClick={onSetVolumeVideo}><VolumeOn /></button> :
                <button disabled={currentlyPlayingUrl ? false : true} onClick={onMuteVideo}><VolumeOff /></button>}
            <input type="range" disabled={currentlyPlayingUrl ? false : true} onChange={(ev) => handleSongVolume(ev)} min="0" max="50" step="1" name="volume" id="volume" />
        </div>
        {currentlyPlayingUrl &&
            <YouTube
                style={{ display: "none" }}
                videoId={currentlyPlayingUrl}
                opts={opts}
                VideoOnReady={videoOnReady}
                onReady={onReadyVideo}
            />
        }
    </div>

}