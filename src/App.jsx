import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth'; 
import WelcomePage from './pages/Welcome';

const App = () =>{

  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage/>} />
      </Routes>
    </Router>
  )
};

export default App
