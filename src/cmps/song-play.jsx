import YouTube, { YouTubeProps } from 'react-youtube';
import { useEffect, useState } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'
import { disable } from 'workbox-navigation-preload';


export function SongPlay() {

    const [player, setPlayer] = useState(null)

    const currentlyPlayingUrl = useSelector(state => state.stationModule.currentlyPlayingUrl)

    useEffect(() => {
    }, [currentlyPlayingUrl])

    const videoOnReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo()
    }

    const onReadyVideo = (event) => {
        setPlayer(event.target)
    }

    const onPauseVideo = (ev) => {
        player.pauseVideo()
    }

    const onPlayVideo = () => {
        player.playVideo()
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

    return <div>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPauseVideo}>Pause</button>
        <button disabled={currentlyPlayingUrl ? false : true} onClick={onPlayVideo}>Play</button>
        {<h6></h6>}
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