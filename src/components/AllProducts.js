import {useState, useEffect} from 'react';
import ProductCard from '../components/ProductCard';

export default function ActiveProducts() {

	const [products, setProducts] = useState([]);
	// const [activeProducts, setActiveProducts] = useState([]);

	useEffect(() => {
	  fetch(`${process.env.REACT_APP_API_URL}/products/all`)
	  .then(res => res.json())
	  .then(data => {
	    setProducts(data.map(product => {
	      return (
	        <ProductCard key={product._id} product={product} />
	      )
	    }))
	  })
	  // dependency 
	}, [products]);

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
		products
	)
};
