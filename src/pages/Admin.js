import '../App.css';
import Sidebar from '../components/Sidebar';
import Orders from './Orders';
import UserContext from '../UserContext';
import {useState, useEffect, useContext} from 'react';
import Swal from 'sweetalert2';
import {Navigate} from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function Admin() {

	const {user, setUser} = useContext(UserContext);
	

	useEffect(() => {
		setUser(user);
	},[])

	console.log(user);

	return (
		// (user.isAdmin == true) ?

		<div className="Admin">

			<Sidebar/>
		</div>

		/*:
		<Navigate to="/" />*/

	)
}