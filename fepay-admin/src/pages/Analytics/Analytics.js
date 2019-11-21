import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { FaBarcode, FaMoneyBill, FaMoneyCheckAlt } from 'react-icons/fa'
import Axios from 'axios';
import Moment from 'moment';
import { SERVER } from '../../config/server.json';

import Logo from '../../Assets/Logo.png';
import './Analytics.scss';

const AnalyticsPage = () => {
  const [topData, setTopData] = useState([]);

  const [sellData, setSellData] = useState([]);

  const getTopData = async () => {
    // console.log(localStorage.getItem('access'));
    const topRespResult = await Axios.get(`${SERVER}/users/rank`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      timeout: 3000,
    }).catch(() => {
      window.location.href = '/';
    });

    if (topRespResult) {
      if (!topRespResult.data) {
        setTopData(null);
        return;
      }

      setTopData(topRespResult.data);
      return;
    }

    setTopData(null);
  }

  const getSellData = async () => {
    const sellRespResult = await Axios.get(`${SERVER}/payments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      timeout: 3000,
    }).catch(() => {
      window.location.href = '/';
    });

    if (sellRespResult) {
      if (!sellRespResult.data) {
        setSellData(null);
        return;
      }

      setTopData(sellRespResult.data);
      return;
    }

    setSellData(null);
  }

  useEffect(() => {
    if (!localStorage.getItem('eventID')) {
      window.location.href = '/';
      return;
    }

    getTopData();
    getSellData();
  }, []);

  return (
    <div className='Analytics-base'>
      <div className='topBar'>
        <div className='logo'>
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
      <div className='content'>
        <div className='section'>
          <div className='section-title'>
            <FaMoneyCheckAlt />
            &nbsp;<h3>잔고 랭킹</h3>
          </div>
          <Paper className='table'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>순위</TableCell>
                  <TableCell align="right">아이디</TableCell>
                  <TableCell align="right">이름</TableCell>
                  <TableCell align="right">잔고</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  topData.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        #{index + 1}
                      </TableCell>
                      <TableCell align="right" component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.balance} 원</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
        <div className='section'>
          <div className='section-title'>
            <FaMoneyBill />
            &nbsp;<h3>거래 내역</h3>
          </div>
          <Paper className='table'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">판매자 아이디</TableCell>
                  <TableCell align="right">구매자 아이디</TableCell>
                  <TableCell align="right">구매 시각</TableCell>
                  <TableCell align="right">판매 금액</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  sellData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.recipient}</TableCell>
                      <TableCell align="right">{row.sender}</TableCell>
                      <TableCell align="right">{Moment(row.matchedAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                      <TableCell align="right">{`${row.amount} 원`}</TableCell>
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
