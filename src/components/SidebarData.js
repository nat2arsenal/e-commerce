import '../App.css';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ReorderIcon from '@mui/icons-material/Reorder';
import LogoutIcon from '@mui/icons-material/Logout';

export const SidebarData = [
	{
		title: "Home",
		icon: <HomeIcon/>,
		link: "/admin"
	},
	{
		title: "Products",
		icon: <InventoryIcon/>,
		link: "/admin/products"
	},
	{
		title: "Orders",
		icon: <ReorderIcon/>,
		link: "/admin/orders"
	},
	{
		title: "Users",
		icon: <PeopleIcon/>,
		link: "/admin/users"
	},
	{
		title: "Logout",
		icon: <LogoutIcon/>,
		link: "/logout"
	}
]