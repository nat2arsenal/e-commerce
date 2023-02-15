import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

export default function OrderHistory() {

	const {userId} = useParams();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/myOrders`, {
			headers: {
	              Authorization: `Bearer ${localStorage.getItem('token')}`
	          }
		}) 
		.then(res => res.json())
		.then(data => {
			// console.log(data);
			setOrders(data);	
		})
	}, [userId])


	return (
		<div>
			<h1>Order History</h1>
			<div>
				<table className="table">
		          <thead>
		            <tr>
		              <th>ID</th>
		              <th>DATE</th>
		              <th>TOTAL</th>
		            </tr>
		          </thead>
		          <tbody>
		            {orders.map((order) => (
		              <tr key={order._id}>
		                <td>{order._id}</td>
		                <td>{order.transactionDate.substring(0, 10)}</td>
		                <td>{order.totalAmount.toFixed(2)}</td>
		              </tr>
		            ))}
		          </tbody>
		        </table>
	        </div>
		</div>
	)
}


