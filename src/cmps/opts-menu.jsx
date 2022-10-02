import React from 'react'
import { CreateStationFromOpts } from "../cmps/create-station-from-opts";
import { useEffect } from 'react'

export const OptsMenu = ({ station, currStation, closeAllModals, onRemoveFromPlaylist, addToPlaylistModal, modalPos, addToPlaylist, ArrowInOptsMenu, myStations, onAddToMyPlaylist }) => {
    // console.log('currStation :', currStation)

    debugger
    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])


    let isStationHardCoded = station.tags.find(tag => tag === 'HardCoded')

    return <>
        <ul style={{ transform: `translate(${modalPos.posX}px, ${modalPos.posY}px)` }} className="song-list-opts-menu">
            <li onClick={(ev) => closeAllModals(ev)}><CreateStationFromOpts /></li>
            <li className="add-to-playlist-section" onMouseOver={() => addToPlaylist(true)}><ArrowInOptsMenu style={{ transform: `rotate(270deg)` }} />Add To Playlist </li>
            {isStationHardCoded ? <li>Remove From Playlist</li> : <li onClick={() => onRemoveFromPlaylist()}>Remove From Playlist</li>}
        </ul>
        {
            addToPlaylistModal &&
            <ul className="add-to-playlist-modal" style={{ transform: `translate(${modalPos.posX - 200}px, ${modalPos.posY - 160}px)` }}>
                {myStations.map((newStation, myPlaylistIdx) =>
                    <li key={myPlaylistIdx}>
                        <div onClick={() => onAddToMyPlaylist(myPlaylistIdx)}>Add to {newStation.name}</div>
                    </li>)}
            </ul>
        }
    </>

}
