import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import AuthPage from './pages/Auth'; 
import WelcomePage from './pages/Welcome';
import SelectRole from './pages/SelectRole';
import NotFoundPage from './pages/NotFound';
import CreateProfilePage from './pages/CreateProfile';
import HomePage from './pages/Home';
import CompanyProfilePage from './pages/CompanyProfile';
import ExamplePage from './pages/Example';
import CompanyDashboardPage from './pages/CompanyDashboard';

const App = () =>{

  return (
    <Router>
      <Routes>
        <Route path='/' element={<WelcomePage/>} />
        <Route path='/autenticacion' element={<AuthPage/>} />
        <Route path='/pagina-principal' element={<HomePage />} />
        <Route element={<ProtectedRoute />} >
          <Route path='/seleccion-rol' element={<SelectRole/>} />
          <Route path='/crea-tu-perfil/:roleId' element={<CreateProfilePage />} />
          <Route path='/perfil-empresa' element={<CompanyProfilePage />} />
        </Route>
        <Route path='/example' element={<CompanyDashboardPage />} />
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </Router>
  )
};

export default App
