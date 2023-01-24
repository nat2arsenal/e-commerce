import {Row, Col, Button, Card, Form, Container} from 'react-bootstrap';
import '../App.css';
import { useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import {useNavigate} from 'react-router-dom';

export default function Checkout() {

	const {user} = useContext(UserContext);
	const {productId} = useParams();
	// console.log(productId);
	const navigate = useNavigate();

	// const {productName, description, price, stocks, _id} = props.product;

	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [totalPrice, setTotalPrice] = useState(`${price}`);
	// const [quantity2, setQuantity2] = useState(1);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setProductName(data.productName);
			setPrice(data.price);
			setStocks(data.stocks);
		})
	}, [productId])

	useEffect(() => {
		if(quantity > stocks){
			setQuantity(stocks)
		} else if(quantity < 1){
			setQuantity(1)
		}
		setTotalPrice(quantity*price);
	},[quantity,price,stocks])

	function checkout(userId, productId){
	  
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
	                 "quantity" : quantity
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
	      navigate("/shop");
	      // updateStocks();
	    }
	  })
	}

	// const updateStocks = () => {

	// 	fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/info/stocks/subtract`, {
	// 		method: "PATCH",
	// 		headers: {
	// 		  'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 		  "stocks" : quantity
	// 		})
	// 	})
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		console.log(data);

	// 	})
	// }


	return (
		<Container className="checkout-page">
		<div>
			<Row className="product-row">
				<Col>
					<Card>
						<Card.Body className="product">
							<Card.Subtitle className="mb-3">Product Name: <span>{`${productName}`}</span></Card.Subtitle>
							<Card.Subtitle className="mb-3">Price: <span>{`${price}`}</span></Card.Subtitle>
							<Card.Subtitle>
								Quantity:
								<Form className="product-quantity mt-3">
									<Form.Group >
										<Form.Control 
											type="number" 
											placeholder={quantity}
											value = {quantity}
											onChange = {e => {
												if(quantity < 1){
													setQuantity(1)
												}else if(quantity > stocks){
													setQuantity(stocks)
												}else{
													setQuantity(e.target.value)
												}
											}} 
											required
										/>
									</Form.Group>
								</Form>
							</Card.Subtitle>
						</Card.Body>
					</Card>
				</Col>
				{/*<Col>
					<Card>
						<Card.Body className="address">
							<Card.Subtitle>Specific Address<span>address</span></Card.Subtitle>
							<Card.Subtitle>City<span>city</span></Card.Subtitle>
							<Card.Subtitle>Mobile Number<span>number</span></Card.Subtitle>
							<Card.Subtitle>Instructions</Card.Subtitle>
							<Card.Text>instructions</Card.Text>
						</Card.Body>
					</Card>
				</Col>*/}
			</Row>
			<Row className="product-row">
				<Button className="checkout-btn mt-3" onClick={() => checkout(user.id, productId)}>Checkout (Total: Php {`${totalPrice}`})</Button>
			</Row>
		</div>
		</Container>
	)
};