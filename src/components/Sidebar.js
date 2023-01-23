import '../App.css';
// import {SidebarData} from './SidebarData';


import { Row, Col } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Accordion from 'react-bootstrap/Accordion';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ReorderIcon from '@mui/icons-material/Reorder';
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from 'react-router-dom';

export default function Sidebar() {

	return (
		<div className="Sidebar">
			<Col className="SidebarList">
				<Row className="row" as={NavLink} to="/admin">
					<div id="icon">
						{<HomeIcon/>}
					</div>
					<div id="title">
						{"Dashboard"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="row" as={NavLink} to="/admin/products">
					<div id="icon">
						{<InventoryIcon/>}
					</div>
					<div id="title">
						{"Products"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="row" as={NavLink} to="/admin/orders">
					<div id="icon">
						{<ReorderIcon/>}
					</div>
					<div id="title">
						{"Orders"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="row" as={NavLink} to="/admin/users">
					<div id="icon">
						{<PeopleIcon/>}
					</div>
					<div id="title">
						{"Users"}
					</div> 
				</Row>
			</Col>
			
			<Col className="SidebarList">
				<Row className="row" as={NavLink} to="/logout">
					<div id="icon">
						{<LogoutIcon/>}
					</div>
					<div id="title">
						{"Logout"}
					</div>
				</Row>
			</Col>
		</div>
	)
}