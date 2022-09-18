import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react'
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
    const [songVolume, setSongVolume] = useState(null)
    const [isSongMuted, setSongMuted] = useState(false)
    const [videoTitle, setVideoTitle] = useState(false)
    const currentlyPlayingUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    const dispatch = useDispatch()
    // const [songVol, handleChange, setSongVol] = useForm({
    //     name: '',
    //     price: ''
    // })

    

    useEffect(()=>{
        setPlay(true)
        console.log(player);
        if (!player) return
        // console.log(player);
        setVideoTitle(player.videoTitle)
    },[player, currentlyPlayingUrl])

    const videoOnReady = (event) => {
        event.target.pauseVideo()
    }

    const onReadyVideo = async (event) => {
        setPlayer(event.target,)
        // setPlay(true)
        // console.log(player);
        // if (!player) return
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
        // player.unMute()
        player.setVolume(songVolume)
        setSongMuted(false)
        // setSongVolume(player.getVolume())
        // player.seekTo(50)
    }

    const handleChange = (ev) => {
        const songVol = +ev.target.value
        player.setVolume(songVol)
        setSongMuted(songVol === 0 ? true : false)
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
        <div className='media-player-btn-action'>
            <button disabled={currentlyPlayingUrl ? false : true} onClick={onPrevVideo}><Prev /></button>
            {playSong ? <button className='media-player-play-stop-btn' disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}><Stop /></button> :
                <button className='media-player-play-stop-btn' disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}><Play /></button>}
            <button disabled={currentlyPlayingUrl ? false : true} onClick={onNextVideo}><Next /></button>
        </div>
        <div className='media-player-video-settings'>
            {(isSongMuted) ? <button disabled={currentlyPlayingUrl ? false : true} onClick={onSetVolumeVideo}><VolumeOn/></button> :
                <button disabled={currentlyPlayingUrl ? false : true} onClick={onMuteVideo}><VolumeOff/></button>}
            <input type="range" disabled={currentlyPlayingUrl ? false : true} onChange={(ev) => handleChange(ev)} min="0" max="50" step="1" name="volume" id="volume" />
        </div>
        {currentlyPlayingUrl &&
            <YouTube
                videoId={currentlyPlayingUrl}
                opts={opts}
                VideoOnReady={videoOnReady}
                onReady={onReadyVideo}
            />
        }
    </div>

}