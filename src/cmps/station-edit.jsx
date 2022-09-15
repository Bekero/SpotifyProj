// import React from 'react';
// import { useEffect, useState } from 'react'
// import { useRef } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useForm } from '../hooks/useForm'
// import { stationService } from '../services/station.service'

// export const StationEdit = () => {

//     const params = useParams()
//     const navigate = useNavigate()

//     const [station, handleChange, setStation] = useForm({
//         name: ''
//     })

//     const inputRef = useRef()

//     useEffect(() => {
//         inputRef.current.focus()
//         const stationId = params.stationId
//         if (!stationId) return
//         stationService.getById(stationId)
//             .then(station => {
//                 setStation(station)
//             })
//             .catch(err => {
//                 console.log('err:', err);
//             })
//     }, [])

//     const onSaveStation = (ev) => {
//         ev.preventDefault()
//         stationService.save({ ...station }).then(() => {
//             navigate('/')
//         })
//     }
    
//     const onBack = () => {
//         navigate('/')
//     }

//     return (
//         <section className='station-edit'>
//             <h1>{station._id ? 'Edit' : 'Add'} Station</h1>
//             <form onSubmit={onSaveStation}>
//                 <label htmlFor="name">Name</label>
//                 <input ref={inputRef} value={station.name} onChange={handleChange} name="name" id="name" />


//                 <button>Save</button>
//             </form>
//             <button onClick={onBack}>Back to Stations App</button>
//         </section>
//     )
// }
