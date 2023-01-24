

import {Row, Col, Button, Form, Container} from 'react-bootstrap';
import Swal from 'sweetalert2';

import { useState} from 'react';


export default function PostProduct() {

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [stocks, setStocks] = useState(0);

    const addProduct = () => {
        fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
            method: "POST",
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
                  title: "Success",
                  icon: "success",
                  text: "Successfully added product."
                })

                

                } else {
                  Swal.fire({
                  title: "Something went wrong",
                  icon: "error",
                  text: "Please try again."
                })
            }

            setProductName("");
            setDescription("");
            setPrice(0);
            setStocks(0);
        })
    }

    // const viewProducts = () => {
    //     fetch(`${process.env.REACT_APP_API_URL}/products/all`)
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    // }

    return (
        <Container>
        <Row>
        	<Col  className="add-product-page">
                <Form>
                    <Form.Group controlId="productName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Product Name" 
                            value = {productName}
                            onChange = {e => setProductName(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Description"
                            value = {description}
                            onChange = {e => setDescription(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price (Php)</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Price"
                            value = {price}
                            onChange = {e => setPrice(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="stocks">
                        <Form.Label>Stocks</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Stocks"
                            value = {stocks}
                            onChange = {e => setStocks(e.target.value)} 
                            required
                        />
                    </Form.Group>
                    <Col>
                        <Row>
                            <Button className="mt-3" variant="primary" onClick={() => addProduct()} >Create</Button>
                        </Row>
                    </Col>                    
                </Form>
            </Col>
        </Row>
        </Container>
    )
};