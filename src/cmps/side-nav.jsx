
import { NavLink } from "react-router-dom";
import React from 'react'
import { CreateStation } from "../cmps/create-station";
import HomeIcon from '../cmps/svg/home-svg'
import SearchIcon from '../cmps/svg/search-svg'
import LibraryIcon from '../cmps/svg/library-svg'
import LikeLinkSvg from '../cmps/svg/like-nav-link'
import { useState } from "react";
import harmonyLogo from "../assets/img/new-logo-h.png"

export function SideNav() {
    const [isHomeActive, setIsHomeActive] = useState(false)
    const [isSearchActive, setSearchIsActive] = useState(false)
    const [isLibraryActive, setLibraryIsActive] = useState(false)

    const iBtnActive = (btn) => {
        switch (btn) {
            case 'home':
                setIsHomeActive(true)
                setSearchIsActive(false)
                setLibraryIsActive(false)
                break;
            case 'search':
                setSearchIsActive(true)
                setIsHomeActive(false)
                setLibraryIsActive(false)
                break;
            case 'library':
                setLibraryIsActive(true)
                setIsHomeActive(false)
                setSearchIsActive(false)
                break;
            case 'likedSongs':
                setIsHomeActive(false)
                setSearchIsActive(false)
                setLibraryIsActive(false)
                break;

            default:
                break;
        }
    }
    return (
        <div className="side-nav">

            <NavLink className="header-logo" to='/' > <img src={harmonyLogo} />Harmony  </NavLink>
            <nav className="nav-container flex column">
                <ul className="flex">
                    <li ><NavLink onClick={() => iBtnActive('home')} to='/' className='flex'> <HomeIcon isActive={isHomeActive} />Home</NavLink></li>
                    <li ><NavLink onClick={() => iBtnActive('search')} to='/search' className='flex'><SearchIcon isActive={isSearchActive} />Search</NavLink> </li>
                    <li ><NavLink onClick={() => iBtnActive('library')} to='/collection/playlist' className='flex'> <LibraryIcon isActive={isLibraryActive} />Your Library</NavLink></li>
                </ul>
            </nav>
            <div className="playlist-container">
                <CreateStation />
                <div className="like-nav-asset flex">
                    <NavLink onClick={() => iBtnActive('likedSongs')} className="like-nav-link" to='/collection/track'> <div className="like-nav-icon"><LikeLinkSvg /></div> Liked Songs</NavLink>
                </div>
                <div className="baseline"></div>
                {/* <MyStations /> */}
            </div>
        </div>
    )
}
