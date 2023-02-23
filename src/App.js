import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Badge,
  Button,
  Nav,
  NavDropdown,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './pages/CartScreen';
import SigninScreen from './pages/SigninScreen';
import ShippingAddressScreen from './pages/ShippingAddressScreen';
import SignupScreen from './pages/SignupScreen';
import PaymentMethodScreen from './pages/PaymentMethodScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen';
import OrderScreen from './pages/OrderScreen';
import OrderHistoryScreen from './pages/OrderHistoryScreen';
import ProfileScreen from './pages/ProfileScreen';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './pages/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './pages/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './pages/ProductListScreen';
import OrderListScreen from './pages/OrderListScreen';
import UserListScreen from './pages/UserListScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/products/categories');
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <div className="d-flex flex-column site-container">
          <ToastContainer position="bottom-center" limit={1} />
          <header className="sticky-top">
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                <Button
                  variant="dark"
                  onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
                >
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip className="tooltip">Filter by Category</Tooltip>
                    }
                  >
                    <i className="fas fa-bars"></i>
                  </OverlayTrigger>
                </Button>

                <Link to="/" className="no-decoration">
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip className="tooltip">Go Shopping</Tooltip>}
                  >
                    <Navbar.Brand className="shop-name">
                      e-commerce shop
                    </Navbar.Brand>
                  </OverlayTrigger>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <div className="w-50">
                    <SearchBox />
                  </div>
                  <div className="w-50 ">
                    <Nav className="me-auto justify-content-end pe-1">
                      <Link to="/cart" className="nav-link">
                        Cart
                        {cart.cartItems.length > 0 && (
                          <Badge pill bg="danger">
                            {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                          </Badge>
                        )}
                      </Link>
                      {userInfo ? (
                        userInfo.isAdmin ? (
                          <></>
                        ) : (
                          <NavDropdown
                            title={userInfo.name}
                            id="basic-nav-dropdown"
                          >
                            <LinkContainer to="/profile">
                              <NavDropdown.Item>User Profile</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/orderhistory">
                              <NavDropdown.Item>Order History</NavDropdown.Item>
                            </LinkContainer>
                            {/* <NavDropdown.Divider /> */}
                            <Link
                              className="dropdown-item"
                              to="#signout"
                              onClick={signoutHandler}
                            >
                              Sign out
                            </Link>
                          </NavDropdown>
                        )
                      ) : (
                        <>
                          <Link className="nav-link" to="/signin">
                            Sign in
                          </Link>
                          <Link className="nav-link" to="/signup">
                            Sign up
                          </Link>
                        </>
                      )}
                      {userInfo && userInfo.isAdmin && (
                        <NavDropdown title="Admin" id="admin-nav-dropdown">
                          <LinkContainer to="/admin/dashboard">
                            <NavDropdown.Item>Dashboard</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/productlist">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/orderlist">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/admin/userlist">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <Link
                            className="dropdown-item"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Sign out
                          </Link>
                        </NavDropdown>
                      )}
                    </Nav>
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </header>
          <div
            className={
              sidebarIsOpen
                ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
                : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
            }
          >
            <Nav className="flex-column text-white w-100 p-2 align-items-center">
              <Nav.Item className="my-3">
                <strong>Categories</strong>
              </Nav.Item>
              {categories.map((category) => (
                <Nav.Item key={category} className="sidebar-category">
                  <LinkContainer
                    to={{ pathname: '/search', search: `category=${category}` }}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <p className="my-3">{category}</p>
                  </LinkContainer>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          <main className="mt-3">
            <Container>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignupScreen />} />
                <Route path="/shipping" element={<ShippingAddressScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route
                  path="/order/:id"
                  element={
                    <ProtectedRoute>
                      <OrderScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orderhistory"
                  element={
                    <ProtectedRoute>
                      <OrderHistoryScreen />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfileScreen />
                    </ProtectedRoute>
                  }
                />
                <Route path="/search" element={<SearchScreen />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <DashboardScreen></DashboardScreen>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/productlist"
                  element={
                    <AdminRoute>
                      <ProductListScreen></ProductListScreen>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orderlist"
                  element={
                    <AdminRoute>
                      <OrderListScreen></OrderListScreen>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/userlist"
                  element={
                    <AdminRoute>
                      <UserListScreen></UserListScreen>
                    </AdminRoute>
                  }
                />
              </Routes>
            </Container>
          </main>
          <footer>
            <div className="text-center">
              <strong>
                <em>For educational purposes only.</em>
              </strong>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
