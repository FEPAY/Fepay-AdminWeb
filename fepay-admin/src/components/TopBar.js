import React from 'react';
import { FaBarcode } from 'react-icons/fa'

import Logo from '../Assets/Logo.png';
import './TopBar.scss';

const TopBar = () => {
  return (
    <div>
      <div className='topBar'>
        <div className='logo' onClick={() => {
          window.location.href = '/analytics';
        }}>
          <img src={Logo} className='image' alt='logo' />
          <span className='text'>FEPAY ADMIN</span>
        </div>
        <div className='memberMgnt' onClick={() => {
          window.location.href = '/members';
        }}>
          회원 관리
    </div>
      </div>
      <div className='topBar-secound'>
        <div className='content-topbar'>
          <FaBarcode />
          &nbsp;<span>행사 코드: <strong>{localStorage.getItem('eventID')}</strong></span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
