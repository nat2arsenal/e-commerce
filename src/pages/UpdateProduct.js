import Swal from 'sweetalert2';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button, Form} from 'react-bootstrap';
import {useParams, useNavigate} from 'react-router-dom';

export default function UpdateProduct() {

	const {productId} = useParams();
	const navigate = useNavigate();
	// const {productName, description, price, stocks, _id} = product;

	const [productName, setProductName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [stocks, setStocks] = useState(0);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setProductName(data.productName);
			setDescription(data.description);
			setPrice(data.price);
			setStocks(data.stocks);
			
		})
	}, [productId])
	// const productInfo = (productId) => {
		
	// }

	const update = (productId) => {
	  fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/info`, {
	      method: "PATCH",
	      headers: {
	        'Content-Type': 'application/json',
	         Authorization: `Bearer ${localStorage.getItem('token')}`
	      },
	      body: JSON.stringify({
	          productName : productName,
	          description : description,
	          price : price,
	          stocks: stocks
	      })
	    })
	    .then(res => res.json())
	    .then(data => {

	      console.log(data)

	      if(data !== false) {
	        Swal.fire({
	            title: "Successfull",
	            icon: "success",
	            text: "Successfully updated product information."
	        })

	        navigate("/admin/products");

	      } else {
	        Swal.fire({
	          title: "Something went wrong",
	          icon: "error",
	          text: "Product information update failed."
	        })
	      }
	    })
	};

	return (
		<Row>
			<Col className="p-5 text-center">
		        <Form>
		            <Form.Group controlId="productName">
		                <Form.Label>Product Name</Form.Label>
		                <Form.Control 
		                    type="text" 
		                    placeholder={productName}
		                    value = {productName}
		                    onChange = {e => setProductName(e.target.value)} 
		                    required
		                />
		            </Form.Group>
		            <Form.Group controlId="description">
		                <Form.Label>Description</Form.Label>
		                <Form.Control 
		                    type="text" 
		                    placeholder={description}
		                    value = {description}
		                    onChange = {e => setDescription(e.target.value)} 
		                    required
		                />
		            </Form.Group>
		            <Form.Group controlId="price">
		                <Form.Label>Price</Form.Label>
		                <Form.Control 
		                    type="number" 
		                    placeholder={price}
		                    value = {price}
		                    onChange = {e => setPrice(e.target.value)} 
		                    required
		                />
		            </Form.Group>
		            <Form.Group controlId="stocks">
		                <Form.Label>Stocks</Form.Label>
		                <Form.Control 
		                    type="number" 
		                    placeholder={stocks}
		                    value = {stocks}
		                    onChange = {e => setStocks(e.target.value)} 
		                    required
		                />
		            </Form.Group>
		            <Col>
		                <Row>
		                    <Button className="mt-3" variant="primary" onClick={() => update(productId)} >Update</Button>
		                </Row>
		            </Col>                    
		        </Form>
		    </Col>
		</Row>
	)
};

UpdateProduct.propTypes = {
    // "shape" method is used to check if prop object conforms to a specific "shape"
    product: PropTypes.shape({
      productName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stocks: PropTypes.number.isRequired
    })
}