import '../App.css';
// import {Row, Col} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

export default function Users() {

	return (
	  <div className="UsersPage">
	        <Sidebar/> 
	        <div className="users-div">    
	        	<h1>Users</h1>
	        </div>
	  </div>
	)
};
