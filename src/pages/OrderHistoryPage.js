// import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Shop } from '../Shop';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, laoding: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryPage() {
  const { state } = useContext(Shop);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      fetch(`${process.env.REACT_APP_API_URL}/api/orders/mine`, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
          // console.log(data);
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        });

      // dispatch({ type: 'FETCH_REQUEST' });
      // try {
      //   const { data } = await axios.get(`/api/orders/mine`, {
      //     headers: {
      //       authorization: `Bearer ${userInfo.token}`,
      //     },
      //   });
      //   dispatch({ type: 'FETCH_SUCCESS', payload: data });
      // } catch (error) {
      //   dispatch({
      //     type: 'FETCH_FAIL',
      //     payload: getError(error),
      //   });
      // }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>&#8369;{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
