import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextPrevSong } from '../store/station.actions';
import play from '../assets/img/play.png'
import stop from '../assets/img/stop.png'
import next from '../assets/img/next.png'
import prev from '../assets/img/prev.png'
import mute from '../assets/img/mute.png'
import unmute from '../assets/img/unmute.png'

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

    useEffect(() => {
        // setVideoTitle(player.videoTitle)
        // console.log(player);
    }, [])

    const videoOnReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
        // setVideoTitle(event.target.player.videoTitle)
    }

    const onReadyVideo = (event) => {
        setPlayer(event.target)
        setPlay(true)
        if (!player) return
        setVideoTitle(player.videoTitle)
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
        // player.seekTo(50)
    }

    const handleChange = (ev) => {
        console.log(+ev.target.value);
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
        {playSong ? <button disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}><img className='media-player-img' src={stop} /></button> :
            <button disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}><img className='media-player-img' src={play} /></button>}
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPrevVideo}><img className='media-player-img' src={prev} /></button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onNextVideo}><img className='media-player-img' src={next} /></button>
        {(isSongMuted) ? <button disabled={currentlyPlayingUrl ? false : true} onClick={onSetVolumeVideo}><img className='media-player-img' src={mute} /></button> :
            <button disabled={currentlyPlayingUrl ? false : true} onClick={onMuteVideo}><img className='media-player-img' src={unmute} /></button>}
        {videoTitle && <h3>{videoTitle}</h3>}
        <input type="range" disabled={currentlyPlayingUrl ? false : true} onChange={(ev) => handleChange(ev)} min="0" max="50" step="1" name="volume" id="volume" />
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