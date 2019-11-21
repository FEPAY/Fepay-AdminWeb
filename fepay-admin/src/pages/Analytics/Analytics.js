import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core'
import { FaBarcode, FaMoneyBill, FaMoneyCheckAlt } from 'react-icons/fa'
import Axios from 'axios';

import Logo from '../../Assets/Logo.png';
import './Analytics.scss';

const AnalyticsPage = () => {
  const [sellData, setSellData] = useState([
    {
      auction: 'TEST',
      memberID: '1',
      price: '15000',
    },
    {
      auction: 'TEST',
      memberID: '1',
      price: '15000',
    },
    {
      auction: 'TEST',
      memberID: '1',
      price: '15000',
    },
    {
      auction: 'TEST',
      memberID: '1',
      price: '15000',
    },
    {
      auction: 'TEST',
      memberID: '1',
      price: '15000',
    },
  ]);

  return (
    <div className='Analytics-base'>
      <div className='topBar'>
        <div className='logo'>
          <img src={Logo} className='image' />
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
          &nbsp;<span>행사 코드: <strong>010101</strong></span>
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
                  <TableCell>아이디</TableCell>
                  <TableCell align="right">잔고</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  sellData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.auction}
                      </TableCell>
                      <TableCell align="right">{row.price} 원</TableCell>
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
                  <TableCell>부스</TableCell>
                  <TableCell align="right">구매자 아이디</TableCell>
                  <TableCell align="right">판매 금액</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  sellData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.auction}
                      </TableCell>
                      <TableCell align="right">{row.memberID}</TableCell>
                      <TableCell align="right">{`${row.price} 원`}</TableCell>
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
