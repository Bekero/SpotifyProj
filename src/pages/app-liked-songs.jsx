
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userService } from '../services/user.service'
import { loadStations } from '../store/station.actions'
import { loadLikedSongs } from '../store/user.actions'

export function LikedSongs() {
    // const [songs, setSongs] = useState([])
    const user = useSelector(state => state.userModule.user)

    const dispatch = useDispatch()



    useEffect(() => {
        console.log(user)
        if (!user) {
            dispatch(loadLikedSongs())
            // getLikedSongs()
            // let newUser = userService.saveLocalUser()
            //Get the songs from the localStorage
        } else if (user) {

            //Get the Liked Songs from the user nad render them
        }
        // if (stations) return
        // dispatch(loadStations())
    }, [])

    // async function getLikedSongs() {
        // const likedSongs = await userService.getLikedSongs()
        // setSongs(likedSongs)

    // }

    // if (!stations) return
    return (
        <div className="liked-station-container">
            <ol>
                {user?.likedSongs && <pre>{JSON.stringify(user?.likedSongs)}</pre>}
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
