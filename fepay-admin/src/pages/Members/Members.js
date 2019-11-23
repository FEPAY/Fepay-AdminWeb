import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import { FaUser } from 'react-icons/fa'
import TopBar from '../../components/TopBar';
import Axios from 'axios';

import { SERVER } from '../../config/server.json';
import './Members.scss';

const AnalyticsPage = () => {
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    const requestUrl = `${SERVER}/users`;
    Axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      timeout: 3000,
    })
      .then((respData) => {
        if (respData) {
          const memberArray = respData.data;
          if (Array.isArray(memberArray)) {
            setMemberData(memberArray);
            return;
          }
        }

        setMemberData([]);
      })
      .catch(() => {
        // window.location = '/';
      });
  }

  const handleMoneyChange = (memberId) => {
    const result = prompt(`${memberId}의 잔고를 수정합니다.\n설정할 잔고를 입력하세요!`);

    if (!result) {
      alert("잔고 수정이 취소되었습니다.");
      return;
    }

    if (result === "") {
      alert("설정할 잔고를 입력하세요.");
      return;
    }

    const requestUrl = `${SERVER}/user/balance?user_id=${memberId}`;
    Axios.put(requestUrl, {
      balance: result,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      }
    });

    updateData();
  }

  const handleUserDelete = (memberId) => {
    const confirmResult = window.confirm(`정말로 ${memberId} 회원을 삭제하시겠습니까?`);
    if (confirmResult === true) {
      const requestUrl = `${SERVER}/user?user_id=${memberId}`;
      Axios.delete(requestUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        timeout: 3000,
      }).catch(() => {
        alert("작업 실패!");
      });

      updateData();
    }
  }

  return (
    <div className='Members-base'>
      <TopBar />
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
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                      <TableCell align="right">{row.balance} 원</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color='inherit' className='btn-margin' onClick={() => { handleMoneyChange(row.id) }}>
                          잔고 수정
                        </Button>
                        <Button variant="contained" color='secondary' onClick={() => { handleUserDelete(row.id) }}>
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
