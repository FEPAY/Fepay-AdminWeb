import React, { useState } from 'react';
import { FaUserLock } from 'react-icons/fa';
import { Button, TextField, Modal, Paper } from '@material-ui/core';
import Logo from '../../Assets/Logo.png';
import Moment from 'moment';
import Axios from 'axios'
import {SERVER} from '../../config/server.json';
import './Register.scss'


const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);

  const handleRegister = async () => {
    if (!email || !password || !name || !eventName || !phone) {
      alert('입력 값을 확인하여 주십시오.');
      return;
    }

    if(Moment.duration(Moment(new Date()).diff(Moment(eventEndDate, 'YYYY-MM-DD'))).asHours() <= 0) {
      alert('마감 날자는 오늘 날자보다 작을 수 없습니다.');
      return;
    }

    const requestUrl = `${SERVER}/admin/signup`;
    const resp = await Axios.post(requestUrl, {
      email,
      password,
      name,
      phone,
      festival_name: eventName,
      closing_date: eventEndDate,
    });

    alert(resp.data);
  }

  return (
    <div className='login-base'>
      <div className='box'>
        <div className='icon'>
          <img src={Logo} />
        </div>
        <div className='title'>
          <h2>행사 등록하기</h2>
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
            type="password"
            fullWidth='true'
            onChange={(event) => {
              setPassword(event.target.value);
            }} />

          <TextField
            label="이름"
            margin='normal'
            variant="outlined"
            fullWidth='true'
            onChange={(event) => {
              setName(event.target.value);
            }} />

          <TextField
            label="Phone"
            margin='normal'
            variant="outlined"
            fullWidth='true'
            onChange={(event) => {
              setPhone(event.target.value);
            }} />

          <TextField
            label="행사명"
            margin='normal'
            variant="outlined"
            fullWidth='true'
            onChange={(event) => {
              setEventName(event.target.value);
            }} />

          <TextField
            label="행사 마감 일자"
            margin='normal'
            variant="outlined"
            type="date"
            defaultValue="2019-11-21"
            fullWidth='true'
            onChange={(event) => {
              setEventEndDate(event.target.value);
            }} />
            
          <Button variant="contained" color="primary" className='btn-login' fullWidth='true' onClick={handleRegister}>
            행사 만들기
          </Button>
          <Button variant="text" color="inherit" fullWidth='true' onClick={() => { window.location.href = '/' }}>
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
};

export default LoginPage;
