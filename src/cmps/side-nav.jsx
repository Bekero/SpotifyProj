
import { NavLink } from "react-router-dom";
import React from 'react'
import { CreateStation } from "../cmps/create-station";
import HomeIcon from '../cmps/svg/home-svg'
import SearchIcon from '../cmps/svg/search-svg'
import LibraryIcon from '../cmps/svg/library-svg'
import LikeLinkSvg from '../cmps/svg/like-nav-link'

export function SideNav() {

    return (
        <div className="side-nav">

            <NavLink className="header-logo" to='/' > Harmony  </NavLink>
            <nav className="nav-container flex column">
                <ul className="flex">
                    <li><NavLink to='/' className='flex'> <HomeIcon />Home</NavLink></li>
                    <li > <NavLink to='/search' className='flex' ><SearchIcon />Search</NavLink> </li>
                    <li ><NavLink to='/collection/playlist' className='flex'> <LibraryIcon />Your Library</NavLink></li>
                </ul>
            </nav>
            <div className="playlist-container">
                <CreateStation />
                <div className="like-nav-asset flex">
                    <NavLink className="like-nav-link" to='/collection/track'> <div className="like-nav-icon"><LikeLinkSvg /></div> Liked Songs</NavLink>
                </div>
                <div className="baseline"></div>
                {/* <MyStations /> */}
            </div>
        </div>
    )
}
