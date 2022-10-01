
import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'
import { CreateStation } from "../cmps/create-station";
import HomeIcon from '../cmps/svg/home-svg'
import SearchIcon from '../cmps/svg/search-svg'
import LibraryIcon from '../cmps/svg/library-svg'
import LikeLinkSvg from '../cmps/svg/like-nav-link'
import { useState } from "react";
import harmonyLogo from "../assets/img/new-logo-h.ico"
import { useDispatch, useSelector } from "react-redux";
import { loadStations } from "../store/station.actions";

export function SideNav() {
    const [isHomeActive, setIsHomeActive] = useState(false)
    const [isSearchActive, setSearchIsActive] = useState(false)
    const [isLibraryActive, setLibraryIsActive] = useState(false)
    let stations = useSelector(state => state.stationModule.stations)
    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(loadStations())
    }, [])

    const onNavigateToStation = async (stationId) => {
        navigate(`/playlist/${stationId}`)
    }

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


    stations = stations.filter(station => station?.createdBy?._id === user?._id)

    return (
        <div className="side-nav">

            <NavLink className="header-logo" to='/' > <img src={harmonyLogo} />Harmony  </NavLink>
            <nav className="nav-container flex column">
                <ul className="flex">
                    <li ><NavLink onClick={() => iBtnActive('home')} to='/' className='flex'> <HomeIcon isActive={isHomeActive} /><span>Home</span></NavLink></li>
                    <li ><NavLink onClick={() => iBtnActive('search')} to='/search' className='flex'><SearchIcon isActive={isSearchActive} /><span>Search</span></NavLink> </li>
                    <li ><NavLink onClick={() => iBtnActive('library')} to='/collection/playlist' className='flex'> <LibraryIcon isActive={isLibraryActive} /><span>Your Library</span></NavLink></li>
                </ul>
            </nav>
            <div className="playlist-container">
                <CreateStation />
                <div className="like-nav-asset flex">
                    <NavLink onClick={() => iBtnActive('likedSongs')} className="like-nav-link" to='/collection/track'> <div className="like-nav-icon"><LikeLinkSvg /></div> Liked Songs</NavLink>
                </div>
                <hr />
                <div className="side-nav-station-container">

                    {!stations.length ? <div> You have no playlists...</div> :
                        stations.map(station => <div className="side-nav-station" onClick={() => onNavigateToStation(station._id)}> {station.name}</div>)}
                </div>

                {/* <MyStations /> */}

            </div>
        </div >
    )
}
