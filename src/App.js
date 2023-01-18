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
// import Error from './pages/Error';
import AdminPage from './pages/AdminPage';

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
    <div className="nav-bar">
      <h2>Diari ibutang ang navbar</h2>
    </div>
    <div className="page">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/logout" element={<Logout/>} />

        </Routes>
      </Router>
    </div>
    <div className="footer">
      <h2>Diari ibutang ang footer</h2>
    </div>
    </UserProvider>
    </>
  );
}

