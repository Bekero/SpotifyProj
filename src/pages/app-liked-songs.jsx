
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadLikedSongs } from '../store/user.actions'
import { StationDetails } from './station-details'

export function LikedSongs() {
    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            dispatch(loadLikedSongs())
        } else if (user) {
            //*Get the Liked Songs from the user and render them
        }
    }, [user])
    return (
        <div className="liked-station-container">
            <ol>
                <StationDetails />
            </ol>
        </div>
    )
}

//* The move = ask if user exist ,
//* if he exist get the likes songs from his data
//* If the user does not exist get the Liked songs from the localStorage

//? Stages :
// save to localStorage if the user does Not Exist
//Always check id user exit and if not get the songs from the localStorage (Here)

//*After each like/disLike update the userArray and reRender the LikedStation
