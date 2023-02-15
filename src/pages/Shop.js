import '../App.css';
import {useState, useEffect} from 'react';
import ActiveProductCard from '../components/ActiveProductCard';
import { Row, Col } from 'react-bootstrap';

export default function Shop() {

	const [products, setProducts] = useState([]);
	const [activeProducts, setActiveProducts] = useState([]);

	useEffect(() => {
	  fetch(`${process.env.REACT_APP_API_URL}/products/all`)
	  .then(res => res.json())
	  .then(data => {
	    setProducts(data);
	  })
	  // dependency 
	}, []);

	useEffect(() => {
	  fetch(`${process.env.REACT_APP_API_URL}/products/active`)
	  .then(res => res.json())
	  .then(data => {
	    setActiveProducts(data)
	  })
	  // dependency 
	}, [products]);

	return (
		<div>
			<h1> Products </h1>
			<div className="products">
				<Row>
					{activeProducts.map((product) => (
					      <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
					        <ActiveProductCard product={product} />
					      </Col>
					))}
				</Row>		
			</div>
		</div>	
	)
}