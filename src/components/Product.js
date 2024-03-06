import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Rating from './Rating';
import { Shop } from '../Shop';

export default function Product(props) {
  const { product } = props;
  const [data, setData] = useState({});
  const { state, dispatch: ctxDispatch } = useContext(Shop);
  const {
    cart: { cartItems },
    userInfo,
  } = state;

  // const isAdmin = userInfo.isAdmin;
  // console.log(userInfo.isAdmin);
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    fetch(`${process.env.ECOMMERCE_APP_API_URL}/api/products/${item._id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card className="d-flex flex-column flex-grow-1">
      <Link to={`/product/${product.slug}`}>
        <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={<Tooltip className="tooltip">View Product</Tooltip>}>
          <img src={product.image} className="card-img-top" alt={product.name} />
        </OverlayTrigger>
      </Link>
      <Card.Body className="flex-grow-1">
        <Link to={`/product/${product.slug}`} className="no-decoration">
          <Card.Title>{product.name}</Card.Title>
        </Link>

        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>&#8369;{product.price}</Card.Text>
        <Card.Text>Stocks: {product.countInStock}</Card.Text>
        {userInfo && userInfo.isAdmin === true ? (
          <div className="product-buttons">
            <Button>Hi Admin!</Button> <Button>Hi Admin!</Button>
          </div>
        ) : product.countInStock > 0 ? (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)} className="btn-danger">
            Unavailable
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
