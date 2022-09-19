
import { NavLink } from "react-router-dom";
import React from 'react'
import { CreateStation } from "../cmps/create-station";
import HomeIcon from '../cmps/svg/home-svg'
import SearchIcon from '../cmps/svg/search-svg'
import LibraryIcon from '../cmps/svg/library-svg'

export function SideNav() {

    return (
        <div className="side-nav">

                <NavLink className="header-logo" to='/' > Harmony  </NavLink>
                <nav className="nav-container flex column">
                    <ul className="flex">
                    <li><NavLink to='/'  className='flex'> <HomeIcon/>Home</NavLink></li>
                   <li > <NavLink to='/search' className='flex' ><SearchIcon/>Search</NavLink> </li>
                    <li ><NavLink to='/collection/playlist'className='flex'> <LibraryIcon/>Your Library</NavLink></li>
                    </ul>
                </nav>
                <div className="playlist-container">
                    <CreateStation />
                    {/* <NavLink className="like-nav-link" to='/collection/track'> <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" class="Svg-ytk21e-0 jAKAlG"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg> Liked Songs</NavLink> */}
                    <div className="like-nav-asset flex">
                    <NavLink className="like-nav-link" to='/collection/track'> <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" className="Svg-ytk21e-0 jAKAlG"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg> Liked Songs</NavLink>
                    </div>
                    <div className="baseline"></div>
                    {/* <MyStations /> */}
                </div>
            </div>
        )
}
