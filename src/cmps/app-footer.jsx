
import React from 'react'
import { MediaPlayer } from './media-player';

export class AppFooter extends React.Component {

    render() {
        return (
            <div className="main-footer-container">
                <div className="media-player">
                    <MediaPlayer />
                </div>
            </div>
        )
    }
}