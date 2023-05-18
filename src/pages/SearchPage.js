// import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
// import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const prices = [
  {
    name: '\u20B11 to \u20B150',
    value: '1-50',
  },
  {
    name: '\u20B151 to \u20B1200',
    value: '51-200',
  },
  {
    name: '\u20B1201 to \u20B11000',
    value: '201-1000',
  },
];

export const ratings = [
  {
    name: '4 stars & up',
    rating: 4,
  },
  {
    name: '3 stars & up',
    rating: 3,
  },
  {
    name: '2 stars & up',
    rating: 2,
  },
  {
    name: '1 stars & up',
    rating: 1,
  },
];

export default function SearchPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `${process.env.REACT_APP_API_URL}/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        })
        .catch((err) => {
          dispatch({
            type: 'FETCH_FAIL',
            payload: getError(err),
          });
        });

      // dispatch({ type: 'FETCH_REQUEST' });
      // try {
      //   const { data } = await axios.get(
      //     `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
      //   );
      //   dispatch({ type: 'FETCH_SUCCESS', payload: data });
      // } catch (err) {
      //   dispatch({
      //     type: 'FETCH_FAIL',
      //     payload: getError(err),
      //   });
      // }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((err) => {
          toast.error(getError(err));
        });

      // try {
      //   const { data } = await axios.get(`/api/products/categories`);
      //   setCategories(data);
      // } catch (err) {
      //   toast.error(getError(err));
      // }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row>
        <Col md={3}>
          <h3>Category</h3>
          <div>
            <ul>
              <li>
                <Link
                  className={
                    'all' === category
                      ? 'text-bold no-decoration'
                      : 'no-decoration'
                  }
                  to={getFilterUrl({ category: 'all', page: 1 })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={
                      c === category
                        ? 'text-bold no-decoration'
                        : 'no-decoration'
                    }
                    to={getFilterUrl({ category: c, page: 1 })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link
                  className={
                    'all' === price
                      ? 'text-bold no-decoration'
                      : 'no-decoration'
                  }
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    className={
                      p.value === price
                        ? 'text-bold no-decoration'
                        : 'no-decoration'
                    }
                    to={getFilterUrl({ price: p.value })}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Rating</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    className={
                      `${r.rating}` === `${rating}`
                        ? 'text-bold no-decoration'
                        : 'no-decoration'
                    }
                    to={getFilterUrl({ rating: r.rating })}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className={
                    rating === 'all'
                      ? 'text-bold no-decoration'
                      : 'no-decoration'
                  }
                  to={getFilterUrl({ rating: 'all' })}
                >
                  <Rating caption={' & up'} rating={0}></Rating>
                </Link>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                <Col md={6}>
                  <div>
                    {countProducts === 0 ? 'No' : countProducts} Results
                    {query !== 'all' && ' : ' + query}
                    {category !== 'all' && ' : ' + category}
                    {price !== 'all' && ' : Price ' + price}
                    {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                    {query !== 'all' ||
                    category !== 'all' ||
                    rating !== 'all' ||
                    price !== 'all' ? (
                      <Button
                        variant="light"
                        onClick={() => navigate('/search')}
                      >
                        <i className="fas fa-times-circle"></i>
                      </Button>
                    ) : null}
                  </div>
                </Col>
                <Col>
                  Sort by{' '}
                  <select
                    value={order}
                    onChange={(e) => {
                      navigate(getFilterUrl({ order: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {products.length === 0 && (
                <MessageBox>No Product/s Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Col sm={6} lg={4} className="mb-3" key={product._id}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>

              <div>
                {[...Array(pages).keys()].map((x) => (
                  <Link key={x + 1} to={getFilterUrl({ page: `${x + 1}` })}>
                    <Button variant={Number(page) === x + 1 ? 'dark' : 'light'}>
                      {x + 1}
                    </Button>
                  </Link>
                  // <LinkContainer
                  //   key={x + 1}
                  //   className="mx-1"
                  //   to={{
                  //     pathname: '/search',
                  //     search: getFilterUrl({ page: x + 1 }, true),
                  //   }}
                  // >
                  //   <Button variant={Number(page) === x + 1 ? 'dark' : 'light'}>
                  //     {x + 1}
                  //   </Button>
                  // </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
