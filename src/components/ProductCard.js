import {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

import '../App.css';

export default function ProductCard({product}) {

  const {productName, description, price, stocks, isActive, _id} = product;

  const [active, setActive] = useState(isActive);  

  useEffect(() => {
    setActive(isActive)
  }, [isActive]);

  const activate = (isActive, productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/activate`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {

        console.log(data)

        if(data !== false) {
          Swal.fire({
              title: "Successfull",
              icon: "success",
              text: "Successfully activated product."
          })
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Product activation failed."
          })
        }
      })
  };

  const archive = (isActive, productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(data => {

        console.log(data)

        if(data !== false) {
          Swal.fire({
              title: "Successfull",
              icon: "success",
              text: "Successfully deactivated product."
          })
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Product deactivation failed."
          })
        }
      })
  };

  return (

    <Card className="all-product-card">
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PhP {price}</Card.Text>
        <Card.Subtitle>Stocks:</Card.Subtitle>
        <Card.Text>{stocks}</Card.Text>
        <Card.Subtitle>isActive?</Card.Subtitle>
        <Card.Text>{`${isActive}`}</Card.Text>
        {/*<div className="productcard-btn">*/}
        <Card.Subtitle>
        {active === true ?
          <Button className="btn bg-danger" onClick={() => archive(active, _id)}>Deactivate</Button>
          :
          <Button className="btn bg-primary" onClick={() => activate(active, _id)}>Activate</Button>
        }
        {" "}
        <Button className="btn bg-primary" as={Link} to={`/admin/products/update/${_id}`} >Update</Button>
        </Card.Subtitle>
        {/*</div>*/}
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