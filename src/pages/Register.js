import { useState, useEffect,useContext } from 'react'; // S54 ACTIVITY

import {useNavigate, Navigate, Link} from 'react-router-dom'; // S54 ACTIVITY


import Swal from 'sweetalert2'; // S54 ACTIVITY

import UserContext from '../UserContext'; // S54 ACTIVITY

import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Register() {

    // const {user, setUser} = useContext(UserContext); // S54 ACTIVITY

    const {user} = useContext(UserContext); // S55 ACTIVITY

    const navigate = useNavigate(); // S55 ACTIVITY


    // State hooks to store the values of the input fields
    const [firstName, setFirstName] = useState(""); // S55 ACTIVITY
    const [lastName, setLastName] = useState(""); // S55 ACTIVITY
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState(""); // S55 ACTIVITY
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    // State to determine wether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);

    // console.log(email);
    // console.log(password);
    // console.log(password2);

    // Function to simulate redirection via form submission
    function registerUser(e) {
        // prevents page redirection via form submission
        e.preventDefault()

        // S55 ACTIVITY
        fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data === true) {

                Swal.fire({
                    title: "Duplicate Email Found",
                    icon: "error",
                    text: "Kindly provide another email to complete registration."
                })
            } else {

                fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobileNumber: mobileNumber,
                        password: password
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)

                    if(data === true) {
                    // Clear input fields
                    setFirstName("");
                    setLastName("")
                    setEmail("");
                    setMobileNumber("");
                    setPassword("");
                    setPassword2("");

                    Swal.fire({
                            title: "Registration Successful",
                            icon: "success",
                            text: "Welcome to Zuitt!"
                        })

                        navigate("/login");

                    } else {

                        Swal.fire({
                            title: "Something went wrong",
                            icon: "error",
                            text: "Please, try again."
                        })
                    }
                })
            }
        })

        //alert('Thank you for registering!');
    }

    // S55 ACTIVITY
    useEffect(() => {
        /*
        MINI ACTIVITY
        Create a validation to enable the submit button when all fields are populated and both passwords match.
        7:45 PM
        */

            // Validation to enable the submit button when all fields are populated and both passwords match.
            if((email !== '' && password !== '' && password2 !== '') && (password === password2)){
                setIsActive(true);
            } else {
                setIsActive(false);
            }

        }, [email, password, password2])


    return (
        (user.id !== null) ? // S54 ACTIVITY
        <Navigate to ="/shop" /> // S54 ACTIVITY
        : // S54 ACTIVITY
        <div className="form-container">
        <Col xs={12} md={4}>
            <Row className="form-col">
                <h2 id="register">Register</h2>
                <Form className="register-form" onSubmit={(e) => registerUser(e)}>
                
                    {/*S55 ACTIVITY*/}
                    <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text"
                        value={firstName}
                        onChange={(e) => {setFirstName(e.target.value)}}
                        placeholder="Enter your First Name" 
                        required
                        />
                  </Form.Group>

                  {/*S55 ACTIVITY*/}
                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text"
                        value={lastName}
                        onChange={(e) => {setLastName(e.target.value)}}
                        placeholder="Enter your Last Name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="Enter email" />
                  </Form.Group>

                  {/*S55 ACTIVITY*/}
                  <Form.Group className="mb-3" controlId="mobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => {setMobileNumber(e.target.value)}}
                        placeholder="0999999999" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="Enter Your Password" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password2">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        value={password2}
                        onChange={(e) => {setPassword2(e.target.value)}}
                        placeholder="Verify Your Password" />
                  </Form.Group>
                  { isActive ?
                            <Button variant="primary" type="submit" id="submitBtn">
                                Submit
                            </Button>
                            : 
                            <Button variant="dark grey" type="submit" id="submitBtn" disabled>
                                Submit
                            </Button>
                  }

                  <p id="register2" className="mt-3">Already have an account? Login <Link style={{textDecoration: 'none'}} to="/login">
                   here</Link></p>
                 
                </Form> 
            </Row>
        </Col>
        </div>
    )

}
 