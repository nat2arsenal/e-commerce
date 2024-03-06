import React, { useContext, useEffect, useReducer } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Shop } from '../Shop';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      fetch(`${process.env.REACT_APP_API_URL}/api/products/slug/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        });
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Shop);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    fetch(`${process.env.REACT_APP_API_URL}/api/products/${product._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.countInStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        ctxDispatch({
          type: 'CART_ADD_ITEM',
          payload: { ...product, quantity },
        });
        navigate('/cart');
      })
      .catch((err) => {
        getError(err);
      });
  };

  return (
    <Row className="mt-md-5">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Col md={6} className="d-flex justify-content-center align-items-center mb-3 mb-md-0">
            <img className="img-large" src={product.image} alt={product.name}></img>
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
              </ListGroup.Item>
              <ListGroup.Item>Price: &#8369;{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? <Badge bg="success">In Stock</Badge> : <Badge bg="danger">Unavailable</Badge>}</Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col>Stocks:</Col>
                          <Col>{product.countInStock}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <div className="d-grid mt-3">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    </>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </>
      )}
    </Row>
  );
}
