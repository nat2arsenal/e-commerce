// import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Shop } from '../Shop';
import { getError } from '../utils';

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_REQUEST':
//       return { ...state, loadingUpdate: true };
//     case 'UPDATE_SUCCESS':
//       return { ...state, loadingUpdate: false };
//     case 'UPDATE_FAIL':
//       return { ...state, loadingUpdate: false };
//     default:
//       return state;
//   }
// };

export default function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Shop);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [inputNewPassword, setInputNewPassword] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const navigate = useNavigate();
  // const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
  //   loadingUpdate: false,
  // });

  const submitNameHandler = async (e) => {
    e.preventDefault();

    fetch(`${process.env.ECOMMERCE_APP_API_URL}/api/users/profile/updateName`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        data.message ? toast.error(data.message) : toast.success('Name updated successfully');
        data.message ? setEditName(true) : <></>;
        navigate('/profile');
      })
      .catch((err) => {
        toast.error(getError(err));
      });
  };

  const submitEmailHandler = async (e) => {
    e.preventDefault();

    fetch(`${process.env.ECOMMERCE_APP_API_URL}/api/users/profile/updateEmail`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        data.message ? toast.error(data.message) : toast.success('Email updated successfully');
        data.message ? setEmail(data.email) : <></>;
        navigate('/profile');
      })
      .catch((err) => {
        toast.error(getError(err));
      });
  };

  const verifyPasswordHandler = async (e) => {
    e.preventDefault();

    fetch(`${process.env.ECOMMERCE_APP_API_URL}/api/users/profile/verifyPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        data.message ? toast.error(data.message) : toast.success('Great! Now Enter New Password.');
        data.message ? setEditPassword(true) : setInputNewPassword(true);
      })
      .catch((err) => {
        toast.error(getError(err));
      });
  };

  const submitNewPasswordHandler = async (e) => {
    e.preventDefault();

    fetch(`${process.env.ECOMMERCE_APP_API_URL}/api/users/profile/updatePassword`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userInfo.token}`,
      },
      body: JSON.stringify({
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        data.message ? toast.error(data.message) : toast.success('Password successfully updated!');
      });

    setInputNewPassword(false);
    setEditPassword(false);
    setPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    navigate('/profile').catch((err) => {
      toast.error(getError(err));
    });
  };

  return (
    <div className="container" id="small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form>
        <Form.Group className="mb-3" controlId="name">
          <div>
            <Form.Label>Name</Form.Label>
          </div>
          <div className="w-100 d-flex">
            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={<Tooltip className="tooltip">Current Name</Tooltip>}>
              <Form.Control
                maxLength={40}
                type="string"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={editName === false}
              ></Form.Control>
            </OverlayTrigger>

            {editName === false ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="tooltip">Click to Edit Name</Tooltip>}
              >
                <Button
                  className="ms-1"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditName(!editName);
                  }}
                >
                  Edit
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="tooltip">Click to Save New Name</Tooltip>}
              >
                <Button
                  className="ms-1"
                  type="submit"
                  onClick={(e) => {
                    submitNameHandler(e);
                    setEditName(!editName);
                  }}
                >
                  Save
                </Button>
              </OverlayTrigger>
            )}
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <div>
            <Form.Label>Email</Form.Label>
          </div>
          <div className="w-100 d-flex">
            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={<Tooltip className="tooltip">Current Email</Tooltip>}>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={editEmail === false}
              ></Form.Control>
            </OverlayTrigger>
            {editEmail === false ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="tooltip">Click to Edit Email</Tooltip>}
              >
                <Button
                  className="ms-1"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditEmail(!editEmail);
                  }}
                >
                  Edit
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="tooltip">Click to Save Email</Tooltip>}
              >
                <Button
                  className="ms-1"
                  type="submit"
                  onClick={(e) => {
                    submitEmailHandler(e);
                    setEditEmail(!editEmail);
                  }}
                >
                  Save
                </Button>
              </OverlayTrigger>
            )}
          </div>
        </Form.Group>
        <Form.Group className={inputNewPassword ? 'd-none' : 'mb-3'} controlId="current-password">
          <div>{editPassword ? <Form.Label>Please Enter Current Password</Form.Label> : <Form.Label>Password</Form.Label>}</div>
          <div className="w-100 d-flex ">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={editPassword === false}
            ></Form.Control>

            {editPassword === false ? (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="tooltip">Click to Edit Password</Tooltip>}
              >
                <Button
                  className="ms-1"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditPassword(true);
                  }}
                >
                  Edit
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="tooltip">Click to Verify Current Password</Tooltip>}
              >
                <Button
                  className="ms-1"
                  type="submit"
                  onClick={(e) => {
                    verifyPasswordHandler(e);
                  }}
                >
                  Verify
                </Button>
              </OverlayTrigger>
            )}
          </div>
        </Form.Group>
        <Form.Group className={inputNewPassword ? 'mb-3' : 'd-none'} controlId="new-password">
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control className="mb-3" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className={inputNewPassword ? 'mb-3' : 'd-none'} controlId="confirm-new-password">
          <Form.Label>Confirm New Password</Form.Label>
          <div className="w-100 d-flex ">
            <Form.Control type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}></Form.Control>
            <Button
              className="ms-1"
              type="submit"
              disabled={newPassword !== confirmNewPassword}
              onClick={(e) => {
                submitNewPasswordHandler(e);
              }}
            >
              Save
            </Button>
          </div>
        </Form.Group>
      </form>
    </div>
  );
}
