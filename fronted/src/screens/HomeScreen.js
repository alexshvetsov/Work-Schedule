import React,{useEffect} from 'react';
import { Table, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import uuid from 'react-uuid'
import { getAllSchedulesAction } from '../actions/scheduleActions';
import Paginate from '../components/Paginate';


const HomeScreen = ({match}) => {

    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']
    const setDay = (dayNumber) => {
        const dayWord = new Date(Number(year), Number(month), Number(dayNumber)).getDay()
        return days[dayWord]
    }

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    
    const getSchedules = useSelector(state => state.getSchedules);
    const { schedules, pages, page  } = getSchedules;

    useEffect(() => {
        console.log( match.params.pageNumber);
            dispatch(getAllSchedulesAction(pageNumber))
    }, [dispatch,pageNumber])


    return (
        <>
            <Row style={{ 'direction': 'rtl' }}>
                <Link
                    className='btn btn-primary my-3'
                    to={userInfo ? '/myshifts' : '/login?redirect=myshifts'}>
                    המשמרות שלי
                    </Link>
                <Link
                    className='btn btn-success my-3'
                    to={userInfo ? '/submitshifts' : '/login?redirect=submitshifts'}>
                    הגשת משמרות
                    </Link>
            </Row>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>רענון</th>
                        <th>משמרת לילה 22:00-6:00</th>
                        <th>משמרת צהריים 14:00-22:00</th>
                        <th>משמרת בוקר 06:00-14:00:00</th>
                        <th>תאריך</th>
                        <th>יום בשבוע</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td className='shiftTD'>
                            <p>אחמ"ש</p>
                            <p>מאבטח 2</p>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    {schedules && 
                        schedules[0].shifts.map((day, index) => (
                            <tr key={uuid()}>
                                <td>
                                    {day.trainings.map((p, index) => <p key={uuid()} className='ml-3' style={{ 'display': 'inline-block' }}>{index > 0 ? ',' : null} {p}</p>)}
                                </td>
                                <td className='shiftTD'>
                                    <p>{day.evening[0] || ''}</p>
                                    <p>{day.evening[1] || ''}</p>
                                </td>
                                <td className='shiftTD'>
                                    <p>{day.afternoon[0]}</p>
                                    <p>{day.afternoon[1]}</p>
                                </td>
                                <td className='shiftTD'>
                                    <p>{day.morning[0]}</p>
                                    <p>{day.morning[1]}</p>
                                </td>
                                <th>{`${index + 1}/${month + 1}/${year}`}</th>
                                <th>{setDay(index + 1)}</th>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Paginate pages={pages} page={page}  /> 

        </>
    )
}

export default HomeScreen
 