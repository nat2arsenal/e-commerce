import {Button, Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import UserContext from '../UserContext';
import {useContext } from 'react';
import Swal from 'sweetalert2';

export default function ActiveProductCard({product}) {
  const {user} = useContext(UserContext);



  const {productName, description, price, stocks, _id} = product;

  function checkout(userId, productId){
      
      console.log(userId);
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/checkout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        "orderProducts" : [  
               {
                   "productId" : `${productId}`,
                   "quantity" : 1
               }
           ]
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      if(data === "isAdmin"){
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Admins can't access this feature."
        })
      } else if (data === false) {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again."
          }) 
      } else if (data !== null) {
        Swal.fire({
          title: "Successfully ordered",
          icon: "success",
          text: "You have successfully ordered."
        })
      }

    })
  }


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
        <Button className="bg-primary" onClick={() => checkout(user.id, _id)}>Checkout</Button>
      </Card.Body>
    </Card>
  );
}

// "proptypes" - are a good way of checking data type of information between components.
ActiveProductCard.propTypes = {
    // "shape" method is used to check if prop object conforms to a specific "shape"
    product: PropTypes.shape({
      // Defined properties and their expected types
      productName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stocks: PropTypes.number.isRequired
    })
}