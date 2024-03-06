import React, { useEffect, useReducer } from 'react';
// import mockData from '../mockData';

// import axios from 'axios';
// import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  // const [products, setProducts] = useState([]);

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      fetch(`${process.env.REACT_APP_API_URL}/api/products`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <h1>Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) =>
              product.isActive === false ? null : (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3 d-flex flex-column">
                  <Product product={product}></Product>
                </Col>
              )
            )}
          </Row>
        )}
      </div>
    </div>
  );
}