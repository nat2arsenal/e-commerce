import Container from 'react-bootstrap/Container';
import {Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../App.css';
import { LinkContainer } from 'react-router-bootstrap';
import {Link, NavLink} from 'react-router-dom';

import {useContext} from 'react';

import UserContext from '../UserContext';

export default function AppNavbar() {

  const {user} = useContext(UserContext);
 
  return (
    <Navbar bg="dark" expand="lg" id="navbar" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to={(user.id !== null) ?"/shop":"/"} >OneProduct Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {(user.id !== null) ?
              <>
              <NavDropdown title= {user.firstName} id="admin-nav-dropdown">
                <LinkContainer to={`/users/${user.id}`}>
                  <NavDropdown.Item >Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={`/users/${user.id}/orders`}>
                  <NavDropdown.Item>My Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <NavDropdown.Item >Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              </>
              :
              <>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

