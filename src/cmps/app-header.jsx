import React from "react";
import {FaAngleLeft,FaAngleRight,FaBeer,FaChevronCircleLeft,FaHouseUser,FaUser,FaUserCircle,} from "react-icons/fa";
import {useNavigate } from "react-router-dom";


export function AppHeader() {
  const navigate = useNavigate();

  const onBack = () => {
    // history.goBack()
    navigate(-1);
  };

  const onForward = () => {
    navigate(+1);
  };
  return (
    <div className='app-header'>
      <div className='app-header-top-bar'>
        <div className='dir-buttons'>
          <button className='go-back-btn' onClick={onBack}><FaChevronCircleLeft /></button>
          <button className='forward-btn' onClick={onForward}><FaAngleRight /></button>
          </div>
        <div className='user-bar'><button className='user-icon'><FaUser /></button></div>
      </div>
    </div>
  );
}
