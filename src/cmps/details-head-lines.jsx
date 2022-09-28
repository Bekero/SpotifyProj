import React from 'react'
import DurationHeadLines from '../cmps/svg/duration-head-line'

export function DetailsHeadLines() {

    return (
        <>
            <div>#</div>
            <div className="title-head-line">TITLE</div>
            {/* <div className="album-head-line">ALBUM</div> */}
            <div className="date-added-head-line">DATE ADDED</div>
            <div className="time-head-line"><DurationHeadLines /></div>
        </>
    )
}