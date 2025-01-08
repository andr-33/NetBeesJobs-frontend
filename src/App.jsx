import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import AuthPage from './pages/Auth'; 
import WelcomePage from './pages/Welcome';
import SelectRole from './pages/SelectRole';
import NotFoundPage from './pages/NotFound';
import CreateProfilePage from './pages/CreateProfile';
import HomePage from './pages/Home';
import ExamplePage from './pages/Example';

const App = () =>{

  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage/>} />
        <Route path='/authentication' element={<AuthPage/>} />
        <Route path='/seleccion-role' element={<SelectRole/>} />
        <Route path='/crea-tu-perfil/:roleId' element={<CreateProfilePage />} />
        <Route path='/pagina-principal' element={<HomePage />} />
        <Route path='/example' element={<ExamplePage />} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </Router>
  )
};

export default App
