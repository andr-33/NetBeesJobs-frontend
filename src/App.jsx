import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth'; 
import WelcomePage from './pages/Welcome';
import ExamplePage from './pages/Example';

const App = () =>{

  return (
    <Router basename='/cv-manager-netbees'>
      <Routes>
        <Route path='/' element={<WelcomePage/>} />
        <Route path='/authentication' element={<AuthPage/>} />
      </Routes>
    </Router>
  )
};

export default App
