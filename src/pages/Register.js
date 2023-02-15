import { useState, useEffect,useContext } from 'react'; 

import {useNavigate, Link} from 'react-router-dom'; 

import Swal from 'sweetalert2'; // 

import UserContext from '../UserContext'; 

import { Form, Button } from 'react-bootstrap';

export default function Register() {

    const navigate = useNavigate();

    const {user} = useContext(UserContext);
 
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState(""); 
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isActive, setIsActive] = useState(false);

    function registerUser(e) {
        e.preventDefault()

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
    }

    useEffect(() => {
        if((email !== '' && password !== '' && password2 !== '') && (password === password2)){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, password2])

    return (
        (user.id !== null) ? 
        navigate("/shop") 
        : 
        <div className="small-container">
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
        </div>
    )

}
 