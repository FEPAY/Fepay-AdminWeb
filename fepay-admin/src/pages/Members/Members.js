import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import { FaUser } from 'react-icons/fa'
import Axios from 'axios';

import { SERVER } from '../../config/server.json';
import './Members.scss';
import Logo from '../../Assets/Logo.png';


const AnalyticsPage = () => {
  const [memberData, setMemberData] = useState([
    {
      user_id: '1',
      name: 'TEST아이디',
      phone: '01000000000',
      balance: '15000',
    },
    {
      user_id: '2',
      name: 'TEST아이디',
      phone: '01000000000',
      balance: '15000',
    },
    {
      user_id: '3',
      name: 'TEST아이디',
      phone: '01000000000',
      balance: '15000',
    },
    {
      user_id: '4',
      name: 'TEST아이디',
      phone: '01000000000',
      balance: '15000',
    },
    {
      user_id: '5',
      name: 'TEST아이디',
      phone: '01000000000',
      balance: '15000',
    },
  ]);

  const updateData = async () => {
    const requestUrl = `${SERVER}/users`;
    const respData = await Axios.post(requestUrl, {
      
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      }
    });

    const memberArray = respData.data;
    if(Array.isArray(memberArray)) {
      setMemberData(memberArray);
    }
  }

  const handleMoneyChange = async (memberId) => {
    const result = prompt(`${memberId}의 잔고를 수정합니다.\n설정할 잔고를 입력하세요!`);

    if (!result) {
      alert("잔고 수정이 취소되었습니다.");
      return;
    }

    if(result === "") {
      alert("설정할 잔고를 입력하세요.");
      return;
    }

    const requestUrl = `${SERVER}/user/balance?user_id=${memberId}`;
    await Axios.put(requestUrl, {
      balance: result,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      }
    });

    await updateData();
  }

  const handleUserDelete = (memberId) => {
    alert(`사용자 삭제: ${memberId}`);
  }

  useEffect(updateData, []);

  return (
    <div className='Members-base'>
      <div className='topBar'>
        <div className='logo' onClick={() => {
          window.location.href = '/analytics';
        }}>
          <img src={Logo} className='image' alt='logo'/>
          <span className='text'>FEPAY ADMIN</span>
        </div>
        <div className='memberMgnt' onClick={() => {
          window.location.href = '/members';
        }}>
          회원 관리
        </div>
      </div>
      <br />
      <div className='content'>
        <div className='section'>
          <div className='section-title'>
            <FaUser />
            &nbsp;<h3>회원 관리</h3>
          </div>
          <Paper className='table'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>아이디</TableCell>
                  <TableCell align="right">이름</TableCell>
                  <TableCell align="right">전화번호</TableCell>
                  <TableCell align="right">잔고</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  memberData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.user_id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.balance}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color='inherit' className='btn-margin' onClick={() => {handleMoneyChange(row.user_id)}}>
                          잔고 수정
                        </Button>
                        <Button variant="contained" color='secondary' onClick={() => {handleUserDelete(row.user_id)}}>
                          회원 삭제
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage;
