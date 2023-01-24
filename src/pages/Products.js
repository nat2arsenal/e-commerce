import '../App.css';
// import {Row, Col} from 'react-bootstrap';
// import Container from 'react';
import Sidebar from '../components/Sidebar';
// import {useState, useEffect, useContext} from 'react';
// import ProductCard from '../components/ProductCard';
import AddProduct from './AddProduct';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import ActiveProducts from '../components/ActiveProducts';
import AllProducts from '../components/AllProducts';

// import UserContext from '../UserContext';

export default function Products() {

  // const {user} = useContext(UserContext);

  // const [products, setProducts] = useState([]);
  // const [activeProducts, setActiveProducts] = useState([]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/products/all`)
  //   .then(res => res.json())
  //   .then(data => {
  //     setProducts(data.map(product => {
  //       return (
  //         <ProductCard key={product._id} product={product} />
  //       )
  //     }))
  //   })
  //   // dependency 
  // }, [products]);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}/products/active`)
  //   .then(res => res.json())
  //   .then(data => {
  //     setActiveProducts(data.map(product => {
  //       return (
  //         <ProductCard key={product._id} product={product} />
  //       )
  //     }))
  //   })
  //   // dependency 
  // }, [products]);


  return (
    <div className="ProductsPage">    
      <Sidebar/>
      <div className="products-div">   
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3">
          <Tab eventKey="all-products" title="All Products" className="tab1-space">
            <AllProducts />
          </Tab>
          {/*<Tab eventKey="active-products" title="Active Products">
            <ActiveProducts />
          </Tab>*/}
          <Tab eventKey="create-product" title="Create Product" className="tab2">
            {<AddProduct/>}
          </Tab>
          {/*<Tab eventKey="contact" title="Contact" disabled>
            {products}
          </Tab>*/}
        </Tabs>
      </div>
    </div>
  )
}