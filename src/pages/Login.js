import { Form, Button, Row, Col } from 'react-bootstrap';

import {useState, useEffect, useContext} from 'react';

// import {useNavigate} from 'react-router-dom';
import {Navigate, Link} from 'react-router-dom';

import UserContext from '../UserContext';

import Swal from 'sweetalert2';

export default function Login() {

    // Allows us to use the User Context Object and properties to use for user validation
    const {user, setUser} = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 

    // used to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    // "useNavigate" hook returns a function that lets us navigate to components
    // const navigate = useNavigate();

    // console.log(email);
    // console.log(password);


    // Function to simulate redirection via form submission
    function authenticate(e) {
        //prevents page redirection via form submission
        e.preventDefault()

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.access);

            if(typeof data.access !== "undefined") {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);
                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to Zuitt!"
                })
                setEmail("");
                setPassword("");
            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Please, check your login details and try again."
                })
                setPassword("");
            }
        });

        //localStorage.setItem allows us to save a key/value pair to localStorage
        //Syntax: (key, value)
        // localStorage.setItem('email', email);
        // sets the global user state to have properties obtained from local storage
        // setUser({email: localStorage.getItem('email')});

        // Clear input fields
        
        
        // navigate('/');
 

        // alert(`${email} has been verified! Welcome back!`);
    };

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation accross the whole application
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })
    };


    useEffect(() => {
        /*
        MINI ACTIVITY
        Create a validation to enable the submit button when all fields are populated and both passwords match
        */
        if(email !== '' && password !== ''){
            setIsActive(true)
        } else{
            setIsActive(false)
        }

    }, [email, password])

    return (

        (user.id == null) ?
        <div className="form-container">
        <Row>
            <Col className="form-col">
                <h2 id="login">Login</h2>
                <Form className="login-form" onSubmit={(e) => authenticate(e)}>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            value = {email}
                            onChange = {e => setEmail(e.target.value)} 
                            required
                        />

                    </Form.Group>

                    <Form.Group className="mt-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value = {password}
                            onChange = {e => setPassword(e.target.value)} 
                            required
                        />
                    </Form.Group>

                        { isActive ?
                            <Button className="mt-3" variant="primary" type="submit" id="submitBtn">
                                Submit
                            </Button>
                            : 
                            <Button className="mt-3" variant="dark grey" type="submit" id="submitBtn" disabled>
                                Submit
                            </Button>
                        }

                    <p className="mt-3">Don't have an account? Register <Link style={{textDecoration: 'none'}} to="/register">
                     here</Link></p>

                </Form>
            </Col>
        </Row>
        </div>
        :
        (user.isAdmin === false) ?
        <Navigate to="/shop" />
        :
        <Navigate to="/admin/dashboard" />

        
    
        
    )

}