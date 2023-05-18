// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Shop } from '../Shop';
import { getError } from '../utils';

export default function SignupPage() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Shop);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   toast.error('Passwords do not match');
    //   return;
    // }

    fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.success('Registration successful! Logging in...');
          ctxDispatch({ type: 'USER_SIGNIN', payload: data });
          localStorage.setItem('userInfo', JSON.stringify(data));
          navigate(redirect || '/');
        }
      })
      .catch((err) => toast.error(getError(err)));

    // try {
    //   const { data } = await axios.post('/api/users/signup', {
    //     name,
    //     email,
    //     password,
    //   });
    //   if (data.message) {
    //     toast.error(data.message);
    //   } else {
    //     ctxDispatch({ type: 'USER_SIGNIN', payload: data });
    //     localStorage.setItem('userInfo', JSON.stringify(data));
    //     navigate(redirect || '/');
    //   }
    //   // console.log(data);
    // } catch (err) {
    //   // console.log(err);
    //   toast.error(getError(err));
    // }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container id="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit" disabled={password !== confirmPassword}>
            Sign Up
          </Button>
        </div>
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
        </div>
      </Form>
    </Container>
  );
}
