
import { NavLink } from "react-router-dom";
import React from 'react'
import { CreateStation } from "../cmps/create-station";

export function SideNav() {

        return (
            <div className="side-nav">

                <NavLink className="header-logo" to='/' > <h2> Harmony </h2></NavLink>
                <nav className="nav-container">
                    <NavLink to='/' >Home</NavLink>
                    <NavLink to='/search' >Search</NavLink>
                    <NavLink to='/collection/playlist' >Library</NavLink>
                </nav>
                <div className="playlist-container">
                    <CreateStation />
                    <NavLink className="like-nav-link" to='/collection/track' >Liked Songs</NavLink>
                    {/* <MyStations /> */}
                </div>
            </div>
        )
}
