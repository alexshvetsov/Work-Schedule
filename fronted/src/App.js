import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import SubmitShiftsScreen from './screens/SubmitShiftsScreen';
import ShiftsPanelScreen from './screens/ShiftsPanelScreen';
import Sidebar from './components/Sidebar.js';
import UserEditScreen from './screens/UserEditScreen';



const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
      <Sidebar xs={2}/>   
      <Container xs={10}>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/submitshifts' component={SubmitShiftsScreen} />
          <Route path='/admin/shifts' component={ShiftsPanelScreen} />
          <Route path='/workers' component={UserEditScreen} />
          <Route path='/page/:pageNumber' component={HomeScreen}/> 
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
    </Router>
  );
}

export default App;
