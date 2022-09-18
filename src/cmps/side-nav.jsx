
import { NavLink } from "react-router-dom";
import React from 'react'
import { CreateStation } from "../cmps/create-station";
import HomeIcon from '../cmps/svg/home-svg'
import SearchIcon from '../cmps/svg/search-svg'
import LibraryIcon from '../cmps/svg/library-svg'

export function SideNav() {

        return (
            <div className="side-nav">

                <NavLink className="header-logo" to='/' > Shlomify  </NavLink>
                <nav className="nav-container flex column">
                    <ul className="flex">
                    <li><NavLink to='/'  className='flex'> <HomeIcon/>Home</NavLink></li>
                   <li > <NavLink to='/search' className='flex' ><SearchIcon/>Search</NavLink> </li>
                    <li ><NavLink to='/collection/playlist'className='flex'> <LibraryIcon/>Youre Library</NavLink></li>
                    </ul>
                </nav>
                <div className="playlist-container">
                    <CreateStation />
                    <NavLink className="like-nav-link" to='/collection/track'>Liked Songs</NavLink>
                    <div className="rr"></div>
                    {/* <MyStations /> */}
                </div>
            </div>
        )
}
