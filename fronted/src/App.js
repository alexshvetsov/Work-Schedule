import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';


const App = () => {
  return (
    <Router>
      <LoginScreen/>
    </Router>
  );
}

export default App;
