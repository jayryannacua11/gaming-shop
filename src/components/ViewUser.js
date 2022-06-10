import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function UserView({productsData}){

	const [products, setProducts] = useState([])

	useEffect(() => {

		const productsArr = productsData.map(product => {
			if(product.isActive){
				return(

					<ProductCard key={product._id} productProp={product} />
					)
			}else return null
		})

		setProducts(productsArr)
	}, [productsData])

	return(
		<>
			<div className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center flex-wrap pb-5">
				{ products }
			</div>
						
		</>
		)
}