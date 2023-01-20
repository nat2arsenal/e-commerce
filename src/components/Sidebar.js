import '../App.css';
// import {SidebarData} from './SidebarData';


import { Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ReorderIcon from '@mui/icons-material/Reorder';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Sidebar() {

	return (
		<div className="Sidebar">
			<Col className="SidebarList">
				<Row className="row" onClick={() => {window.location.pathname = "/admin"}}>
					<div id="icon">
						{<HomeIcon/>}
					</div>
					<div id="title">
						{"Home"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="row" onClick={() => {window.location.pathname = "/admin/products"}}>
					<div id="icon">
						{<InventoryIcon/>}
					</div>
					<div id="title">
						{"Products"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="row" onClick={() => {window.location.pathname = "/admin/orders"}}>
					<div id="icon">
						{<ReorderIcon/>}
					</div>
					<div id="title">
						{"Orders"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="row" onClick={() => {window.location.pathname = "/admin/users"}}>
					<div id="icon">
						{<PeopleIcon/>}
					</div>
					<div id="title">
						{"Users"}
					</div> 
				</Row>
			</Col>
			<Col className="SidebarList">
				<Row className="row" onClick={() => {window.location.pathname = "/logout"}}>
					<div id="icon">
						{<LogoutIcon/>}
					</div>
					<div id="title">
						{"Logout"}
					</div> 
				</Row>
			</Col>
{/*			<Col className="SidebarList">
				<Row className="row">
					<Dropdown>
				      <Dropdown.Toggle id="dropdown-basic">
				      		<div id="dropdown-icon">
				      			{<LogoutIcon/>}
				      			{"Logout"}
				      		</div>
				      </Dropdown.Toggle>

				      <Dropdown.Menu>
				        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
				        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
				        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
				      </Dropdown.Menu>
				    </Dropdown>
				</Row>
			</Col>*/}
		{/*	<ul className="SidebarList">
				{SidebarData.map((data) => {
					return (
						<li 
							key={data.title}
							className="row"
							id={window.location.pathname == data.link ? "active" : ""}
							onClick={() => {window.location.pathname = data.link}}> 
							<div id="icon">
								{data.icon}
							</div>
							<div id="title">
								{data.title}
							</div> 
							
						</li>
					)
				})}

			</ul>*/}

		</div>
	)
}