import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
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

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
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
    try {
      const { data } = await axios.patch(
        'api/users/profile/updateName',
        {
          name,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(data.message || 'Name updated successfully');
      data.message ? setEditName(true) : <></>;
      navigate('/profile');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const submitEmailHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        'api/users/profile/updateEmail',
        {
          email,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(data.message || 'Email updated successfully');
      data.message ? setEmail(data.email) : <></>;
      navigate('/profile');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const verifyPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'api/users/profile/verifyPassword',
        {
          password,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      toast.success(data.message || 'Great! Now Enter New Password.');
      data.message ? setEditPassword(true) : setInputNewPassword(true);
      // navigate('/profile');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const submitNewPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(
        'api/users/profile/updatePassword',
        {
          newPassword,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Password successfully updated!');
      setInputNewPassword(false);
      setEditPassword(false);
      setPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      navigate('/profile');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.put(
  //       '/api/users/profile',
  //       {
  //         name,
  //         email,
  //         password,
  //       },
  //       {
  //         headers: {
  //           authorization: `Bearer ${userInfo.token}`,
  //         },
  //       }
  //     );
  //     dispatch({ type: 'UPDATE_SUCCESS' });
  //     ctxDispatch({ type: 'USER_SIGNIN', payload: data });
  //     localStorage.setItem('userInfo', JSON.stringify(data));
  //     toast.success('User updated successfully');
  //     navigate('/profile');
  //   } catch (err) {
  //     dispatch({
  //       type: 'UPDATE_FAIL',
  //     });
  //     toast.error(getError(err));
  //   }
  // };

  return (
    <div className="container small-container">
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
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip className="tooltip">Current Name</Tooltip>}
            >
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
                overlay={
                  <Tooltip className="tooltip">Click to Edit Name</Tooltip>
                }
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
                overlay={
                  <Tooltip className="tooltip">Click to Save New Name</Tooltip>
                }
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
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip className="tooltip">Current Email</Tooltip>}
            >
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
                overlay={
                  <Tooltip className="tooltip">Click to Edit Email</Tooltip>
                }
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
                overlay={
                  <Tooltip className="tooltip">Click to Save Email</Tooltip>
                }
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
        <Form.Group
          className={inputNewPassword ? 'd-none' : 'mb-3'}
          controlId="currentPassword"
        >
          <div>
            {editPassword ? (
              <Form.Label>Please Enter Current Password</Form.Label>
            ) : (
              <Form.Label>Password</Form.Label>
            )}
          </div>
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
                overlay={
                  <Tooltip className="tooltip">Click to Edit Password</Tooltip>
                }
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
                overlay={
                  <Tooltip className="tooltip">
                    Click to Verify Current Password
                  </Tooltip>
                }
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
        <Form.Group
          className={inputNewPassword ? 'mb-3' : 'd-none'}
          controlId="newPassword"
        >
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group
          className={inputNewPassword ? 'mb-3' : 'd-none'}
          controlId="confirmNewPassword"
        >
          <Form.Label>Confirm New Password</Form.Label>
          <div className="w-100 d-flex ">
            <Form.Control
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            ></Form.Control>
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
