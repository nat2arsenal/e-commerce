import '../App.css';
import Sidebar from '../components/Sidebar';
// import Orders from './Orders';
// import UserContext from '../UserContext';
// import {useState, useEffect, useContext} from 'react';
// import Swal from 'sweetalert2';
// import {Navigate} from 'react-router-dom';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Admin() {


	// const {user} = useContext(UserContext);
	// console.log(user);


	// console.log(user.isAdmin);

	return (
		// (user.isAdmin == true) ?

		<div className="admin">
			<div className="sidebar">
				<Sidebar/>
			</div>
			<div className="users-div">    
				<h1>Admin Dashboard</h1>
			</div>
			{/*<div>
				<h1> Dashboard</h1>
				<h4> pages/Admin.js</h4>
			</div>*/}
		</div>
		// :
		// <Navigate to="/" />

	)
}