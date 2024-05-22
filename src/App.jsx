import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Register from 'pages/register';
import Home from 'pages/home';
import ForgotPassword from 'pages/forgot-password';
import PasswordReset from 'pages/password-reset';
import NotFoundPage from 'pages/404';
import Reserva from "./pages/Reserva";
import Ubicacion from "./pages/Ubicacion";
import EditarEmpresa from "./pages/EditarEmpresa";
import EmpresasInfo from "./pages/empresasinfo";
import Admin from "./pages/Administracion";
import "./App.css"


function App() {
  return (
    <div className="antialiased">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/empresas-info/:id" element={<EmpresasInfo />} />
        <Route path="/reserva" element={<Reserva/>} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/editarempresas" element={<EditarEmpresa />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
