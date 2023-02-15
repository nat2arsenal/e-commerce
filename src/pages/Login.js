import { Form, Button } from 'react-bootstrap';

import {useState, useEffect, useContext} from 'react';

import {useNavigate, Link, Navigate} from 'react-router-dom';

import UserContext from '../UserContext';

import Swal from 'sweetalert2';



export default function Login() {

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

    function authenticate(e) {

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
                navigate("/shop");
            } else {
                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Please, check your login details and try again."
                })
                setPassword("");
            }
        });
    };

    const retrieveUserDetails = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setUser({
                id: data._id,
                isAdmin: data.isAdmin,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                mobileNumber: data.mobileNumber
            })
        })
    };

    useEffect(() => {

        if(email !== '' && password !== ''){
            setIsActive(true)
        } else{
            setIsActive(false)
        }
    }, [email, password])

    return (
        (user.id === null) ?
        <div className="small-container">         
            <h2 className="my-3">Login</h2>
            <Form onSubmit={(e) => authenticate(e)}>
                <Form.Group className="mb-3" controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange = {e => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        onChange = {e => setPassword(e.target.value)} 
                        required
                    />
                </Form.Group>
                <div className="mb-3">
                    { isActive ?
                        <Button className="mb-3" variant="primary" type="submit" id="submitBtn">
                            Submit
                        </Button>
                        : 
                        <Button className="mb-3" variant="dark grey" type="submit" id="submitBtn" disabled>
                            Submit
                        </Button>
                    }
                </div>
                <div className="mb-3">
                    <p className="mb-3">Don't have an account? Register <Link to="/register">
                     here</Link></p>
                </div>
            </Form>
        </div>
        :
        (user.isAdmin === false) ?
        // navigate("/shop");
        <Navigate to="/shop"/>
        :
        <Navigate to="/admin/dashboard"/>
        // navigate("/admin/dashboard")
    )
}