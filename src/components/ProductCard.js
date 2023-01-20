import {useState, useEffect} from 'react';
import {Button, Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function ProductCard({product}) {

  const {productName, description, price, stocks} = product;
  return (
    <Card>
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PhP {price}</Card.Text>
        <Card.Subtitle>Stocks:</Card.Subtitle>
        <Card.Text>{stocks}</Card.Text>
        {/*<Button className="bg-primary" as={Link} to={`/courses/${_id}`} >Update</Button>*/}

      </Card.Body>
    </Card>
  );
}

// "proptypes" - are a good way of checking data type of information between components.
ProductCard.propTypes = {
    // "shape" method is used to check if prop object conforms to a specific "shape"
    product: PropTypes.shape({
      // Defined properties and their expected types
      productName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stocks: PropTypes.number.isRequired
    })
}