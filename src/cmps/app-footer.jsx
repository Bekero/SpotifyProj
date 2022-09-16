
import YouTube, { YouTubeProps } from 'react-youtube';
import React from 'react'
import { MediaPlayer } from './media-player';

export class AppFooter extends React.Component {

    render() {
        return (
            <div className="media-player-container">
                <div className="media-player">
                    <MediaPlayer />
                    <h6>X</h6>
                    <span>Album name</span>
                    <span>Date Added</span>
                    <span>Y</span>
                </div>
            </div>
        )
    }
}