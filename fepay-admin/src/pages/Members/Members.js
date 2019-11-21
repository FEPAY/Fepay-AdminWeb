import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import {SERVER} from '../../config/server.json';
import './Members.scss';
import Axios from 'axios';

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

  const handleMoneyChange = (memberId) => {
    alert(`사용자 잔고 변경: ${memberId}`);
  }

  const handleUserDelete = (memberId) => {
    alert(`사용자 삭제: ${memberId}`);
  }

  useEffect(updateData, []);

  return (
    <div className='Analytics-base'>
      <div className='topBar'>
        <div className='logo' onClick={() => {
          window.location.href = '/analytics';
        }}>
          FEPAY ADMIN
        </div>
        <div className='memberMgnt' onClick={() => {
          window.location.href = '/members';
        }}>
          회원 관리
        </div>
      </div>
      <br />
      <div className='content'>
        <h4>행사 코드: 010101</h4>
        <div className='section'>
          <h3>회원 관리</h3>
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
