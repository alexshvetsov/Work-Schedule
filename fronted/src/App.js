import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import SubmitShiftsScreen from './screens/SubmitShiftsScreen';
import ShiftsPanelScreen from './screens/ShiftsPanelScreen';



const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
      <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/submitshifts' component={SubmitShiftsScreen} />
          <Route path='/admin/setshifts' component={ShiftsPanelScreen} />
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
    </Router>
  );
}

export default App;
