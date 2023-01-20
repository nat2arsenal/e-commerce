import '../App.css';
import {Row, Col} from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import {useState, useEffect} from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      setProducts(data.map(product => {
        return (
          <ProductCard key={product._id} product={product} />
        )
      }))
    })
    // dependency 
  }, []);


  return (
    <div className="ProductsPage">
        <Sidebar/>  
        <div>   
          {products}
        </div>
    </div>
  )
}