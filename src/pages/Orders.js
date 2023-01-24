import '../App.css';
import Sidebar from '../components/Sidebar';
// import {Row, Col} from 'react-bootstrap';

export default function Orders() {

  return (
    <div className="OrdersPage">   
          <Sidebar/>
          <div className="orders-div">   
            <h1>Orders</h1>
          </div>
    </div>
  )
}