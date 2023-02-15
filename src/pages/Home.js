import {NavLink} from 'react-router-dom';

export default function Home() {

	return (

		<div className="home-page d-flex flex-column justify-content-center">
			<h1>Welcome to <i>OneProduct Shop</i></h1>
			<br/>
			<h3>Where you can buy one type of product on each purchase</h3>
			<br/>
			<h5>Please <NavLink className="navlink" to="/login">login </NavLink> to start shopping, or <NavLink className="navlink" to="/register">signup </NavLink>if you don't have an account.</h5>
		</div>
	)
}