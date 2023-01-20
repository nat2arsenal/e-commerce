import './App.css';
// import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom';

import {useState, useEffect} from 'react';

import {UserProvider} from './UserContext';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import AdminPage from './pages/AdminPage';
import Admin from './pages/Admin';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';



export default function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin:null
  });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      .then(res => res.json())
      .then(data => {
          // user is logged in
          if(typeof data._id !== "undefined") {

              setUser({
                  id: data._id,
                  isAdmin: data.isAdmin
              })
          } 
          // user is logged out
          else { 
              setUser({
                  id: null,
                  isAdmin: null
              })
          }
      })
  }, []);

  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/adminPage" element={<AdminPage/>} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/*" element={<Error/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/admin/products" element={<Products/>} />
          <Route path="/admin/orders" element={<Orders/>} />
          <Route path="/admin/users" element={<Users/>} />
        </Routes>
      </Router>
    </UserProvider>
    </>
  );
}

