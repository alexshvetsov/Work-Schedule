import React, { useEffect } from 'react'
import { Table, Form, Alert, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid'
import { Link } from 'react-router-dom';
import { getAllSchedulesAction } from '../actions/scheduleActions';
import { Button, Typography, TextField } from '@material-ui/core';

const MyShiftsScreen = ({ history }) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch()
    const getSchedules = useSelector(state => state.getSchedules);
    const { schedules, pages, page } = getSchedules;
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

    const setDay = (dayNumber) => {
        if (schedules[0]) {
            const dayWord = new Date(Number(new Date(schedules[0].date).getFullYear()), Number(new Date(schedules[0].date).getMonth()), Number(dayNumber)).getDay()
            return days[dayWord]
        } else return null
    }
    const theme = useSelector(state => state.theme);
    const { isDark } = theme;


    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        } else if (!schedules) {
            dispatch(getAllSchedulesAction(0))
        }
    }, [dispatch, userInfo])

    const checkShift = (day) => {
        const shifts = Object.keys(day).map(tempShift => (day[tempShift][0] === userInfo.name || day[tempShift][1] === userInfo.name ? tempShift : null))
        let shift = shifts.filter(tempShift => tempShift !== null)[0]
        let secondShift = shifts.filter(tempShift => (tempShift !== null && tempShift !== shift))[0]
        if (shift) {
            if (secondShift) {
                secondShift = secondShift === 'evening' ? 'ערב' : secondShift === 'morning' ? 'בוקר' : 'צהריים'
            }
            shift = shift === 'evening' ? 'ערב' : shift === 'morning' ? 'בוקר' : 'צהריים'
        }
        return shift ? `${shift ? shift : ''} ${secondShift ? ',' + secondShift : ''}` : 'אין משמרת'
    }



    const exportPDF = () => {
        if (!schedules) {
            return
        }
        window.print()
    }

    return (
        <>
            <Row style={{ 'direction': 'rtl' }}>
                <Link
                    className={'btn btn-primary my-3'}
                    to='/'>
                    דף הבית
                 </Link>

            </Row>
            <Table className="right" striped bordered hover responsive size="sm" variant={isDark ? 'dark' : 'light'}
            >
                <thead>
                    <tr>

                        <th style={{ fontFamily: 'sans-serif', fontSize: "30px" }}>משמרת</th>
                        <th style={{ fontFamily: 'sans-serif', fontSize: "30px" }}>יום</th>
                        <th style={{ fontFamily: 'sans-serif', fontSize: "30px" }}>תאריך</th>
                    </tr>
                </thead>
                <tbody>
                    {(schedules && userInfo.name) &&
                        schedules[0].shifts.map((day, index) => (
                            <tr key={uuid()}>
                                <td>
                                    {checkShift(day)}
                                </td>
                                <td className={
                                    setDay(new Date(schedules[0].date).getDate() + index) === 'שישי' || setDay(new Date(schedules[0].date).getDate() + index) === 'שבת' ?
                                        isDark ? 'green' : 'light-green' : ''
                                }>{setDay(new Date(schedules[0].date).getDate() + index)}</td>
                                <td>{`${new Date(schedules[0].date).getDate() + index}/${new Date(schedules[0].date).getMonth() + 1}/${new Date(schedules[0].date).getFullYear()}`}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Button onClick={exportPDF} variant="contained" color="primary">הורד משמרות </Button>
        </>
    )
}

export default MyShiftsScreen
