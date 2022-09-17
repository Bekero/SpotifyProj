import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNextSong } from '../store/station.actions';
import play from '../assets/img/play.png'
import stop from '../assets/img/stop.png'
import next from '../assets/img/next.png'
import mute from '../assets/img/mute.png'
import unmute from '../assets/img/unmute.png'

//* setShuffle() , getPlaylist() , getDuration()
//* React-Toastify
//* Google API you user search
//* react beautiful d&d

export function MediaPlayer() {

    const [player, setPlayer] = useState(null)
    const [playSong, setPlay] = useState(null)
    const currentlyPlayingUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)
    const dispatch = useDispatch()

    // useEffect(() => {}, [currentlyPlayingUrl])

    const videoOnReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
    }

    const onReadyVideo = (event) => {
        setPlayer(event.target)
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
        // currSongIdx++
        // dispatch(setNextSong())
        dispatch(setNextSong(1))
    }

    const onMuteVideo = () => {
        player.mute()
    }

    const onSetVolumeVideo = () => {
        player.unMute()
        player.seekTo(50)
    }
    // const videoTitle = player.videoTitle
    // console.log('player :', player.videoTitle)

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
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}><img className='media-player-img' src={stop} /></button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}><img className='media-player-img' src={play} /></button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onNextVideo}><img className='media-player-img' src={next} /></button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onMuteVideo}><img className='media-player-img' src={unmute} /></button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onSetVolumeVideo}><img className='media-player-img' src={mute} /></button>
        {/* {videoTitle && <h3>{videoTitle}</h3>} */}
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