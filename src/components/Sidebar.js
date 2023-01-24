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
				<Row className="sidebar-row-link" as={NavLink} to="/admin/dashboard">
					<div id="sidebar-icon">
						{<HomeIcon/>}
					</div>
					<div id="sidebar-title">
						{"Dashboard"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="sidebar-row-link" as={NavLink} to="/admin/products">
					<div id="sidebar-icon">
						{<InventoryIcon/>}
					</div>
					<div id="sidebar-title">
						{"Products"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="sidebar-row-link" as={NavLink} to="/admin/orders">
					<div id="sidebar-icon">
						{<ReorderIcon/>}
					</div>
					<div id="sidebar-title">
						{"Orders"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="sidebar-row-link" as={NavLink} to="/admin/users">
					<div id="sidebar-icon">
						{<PeopleIcon/>}
					</div>
					<div id="sidebar-title">
						{"Users"}
					</div> 
				</Row>
			</Col>
			
			<Col className="SidebarList">
				<Row className="sidebar-row-link" as={NavLink} to="/logout">
					<div id="sidebar-icon">
						{<LogoutIcon/>}
					</div>
					<div id="sidebar-title" >
						{"Logout"}
					</div>
				</Row>
			</Col>
			
		</div>
	)
}