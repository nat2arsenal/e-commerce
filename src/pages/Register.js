import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';

export default function Register() {

    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState(""); 
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState(""); 
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [isActive, setIsActive] = useState(false);


    function registerUser(e) {
        // prevents page redirection via form submission
        e.preventDefault()

        setFirstName("");
        setLastName("")
        setEmail("");
        setMobileNo("");
        setPassword1("");
        setPassword2("");

        alert('Thank you for registering!');
    }


    useEffect(() => {
        if((email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [email, password1, password2])


    return (


        <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="text-center mb-3 mt-3">Registration form</h1>

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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {/*S55 ACTIVITY*/}
          <Form.Group className="mb-3" controlId="mobileNo">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control 
                type="text"
                value={mobileNo}
                onChange={(e) => {setMobileNo(e.target.value)}}
                placeholder="0999999999" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password1">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                value={password1}
                onChange={(e) => {setPassword1(e.target.value)}}
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
            
        </Form>
    )

}
