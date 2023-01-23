// import Container from 'react-bootstrap/Container';
import {Nav, Navbar} from 'react-bootstrap';

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
    <Navbar bg="light" expand="lg">
      {/*<Container>*/}
        <Navbar.Brand as={Link} to="/">Zuitt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

            {/*
            "as" - prop that allows components to be treated as if they are a different component gaining access to its properties and functionalities

            "to" -prop that is used in place of "href" for providing URL for the page

            */}
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/orders">My Orders</Nav.Link>

            {(user.id !== null) ?
              <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>
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

