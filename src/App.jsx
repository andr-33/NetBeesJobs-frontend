import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './views/Auth'; 


const App = () =>{

  return (
    <Router>
      <Routes>
        <Route path='/cv-manager-netbees/' element={<AuthPage/>} />
      </Routes>
    </Router>
  )
};

export default App
