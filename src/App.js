import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Container} from 'react-bootstrap';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import {Link} from 'react-router-dom';

import {useState, useEffect} from 'react';

import {UserProvider} from './UserContext';

import AppNavbar from './components/AppNavbar';

import Shop from './pages/Shop';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Admin from './pages/Admin';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import UpdateProduct from './pages/UpdateProduct';
import Checkout from './pages/Checkout';
import Home from './pages/Home';



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
    <div className="App">
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container fluid>
          <Routes>
            {/*<Route path="/users/:userId/checkout" element={<Checkout/>} />*/}
            <Route path="/checkout/:productId" element={<Checkout/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/*" element={<Error/>} />
            <Route path="/admin/dashboard" element={<Admin/>} />
            <Route path="/admin/products" element={<Products/>} />
            <Route path="/admin/products/update/:productId" element={<UpdateProduct/>} />
            <Route path="/admin/orders" element={<Orders/>} />
            <Route path="/admin/users" element={<Users/>} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
    </div>
  );
}

