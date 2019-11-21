import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Logo from '../../Assets/Logo.png';
import {SERVER} from '../../config/server.json';
import Axios from 'axios';
import './Login.scss'

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('입력 값을 확인하십시오.');
    }

    const respData = await Axios.post(`${SERVER}/admin/auth`, {
      email,
      password,
    });

    if(!respData.data.access) {
      alert('로그인에 실패하였습니다.');
    }

    localStorage.setItem('access', respData.data.access);
    window.location.href = '/analytics';
  }

  return (
    <div className='login-base'>
      <div className='box'>
        <div className='icon'>
          <img src={Logo} alt='logo'/>
        </div>
        <div className='title'>
          <h2>관리자 로그인</h2>
        </div>
        <form className='login-form'>
          <TextField
            label="E-Mail"
            margin='normal'
            variant="outlined"
            fullWidth='true'
            onChange={(event) => {
              setEmail(event.target.value);
            }} />
          <TextField
            label="Password"
            margin='normal'
            variant="outlined"
            fullWidth='true'
            onChange={(event) => {
              setPassword(event.target.value);
            }} />
          <Button variant="contained" color="primary" className='btn-login' fullWidth='true' onClick={handleLogin}>
            로그인
          </Button>
          <Button variant="text" color="inherit" fullWidth='true' onClick={() => { window.location.href = '/register' }}>
            행사 만들기
          </Button>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;
