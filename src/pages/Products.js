import '../App.css';
import Sidebar from '../components/Sidebar';
import AddProduct from './AddProduct';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AllProducts from '../components/AllProducts';

export default function Products() {

  return (
    <div className="ProductsPage">    
      <div className="Sidebar">
          <Sidebar/>
      </div>
      <div className="products-div">   
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="all-products" title="All Products" className="tab1-space">
            <AllProducts />
          </Tab>
          <Tab eventKey="create-product" title="Create Product" className="tab2">
            {<AddProduct/>}
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}