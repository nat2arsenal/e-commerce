// import Container from 'react-bootstrap/Container';
import {Nav, Navbar} from 'react-bootstrap';
import '../App.css';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

import {Link, NavLink} from 'react-router-dom';

import {useContext} from 'react';

import UserContext from '../UserContext';

export default function AppNavbar() {

  // State to store user information upon user login
  // const [user, setUser] = useState(localStorage.getItem('email'));

  // State to store user information upon login
  const {user} = useContext(UserContext);
  console.log(user);

  return (
    <Navbar bg="light" expand="lg" id="navbar">
      {/*<Container>*/}
        <Navbar.Brand as={Link} to={(user.id !== null) ?"/shop":"/"}>OneProduct Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-buttons">
            {(user.id !== null) ?
              <>
              {/*<Nav.Link as={NavLink} to="/users/:userId/orders">My Orders</Nav.Link>*/}
              <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
              </>
              :
              <>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      {/*</Container>*/}
    </Navbar>
  );
}

