import UserView from '../components/ViewUser';
import AdminView from '../components/ViewAdmin';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import {Select, InputLabel, MenuItem, FormControl} from '@mui/material';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Product(){

	const { user } = useContext(UserContext);

	const [ allProducts, setAllProducts] = useState([]);
	const [sortBy, setSortBy] = useState('');

	const fetchData = () => {
		fetch('http://localhost:4000/products/all')
		.then(res => res.json() )
		.then(data => {
			const sortedOrders = data.reverse();
			setAllProducts(sortedOrders)

			sortProd(data)
		})
	}

	useEffect(() => {
		fetchData()
	}, [sortBy])

	const sortProd = (data) => {
		if(sortBy === 'lto'){
			const sortedProd = data.sort((a, b) =>
				new Date(b.createdOn) - new Date(a.createdOn)
			)
			setAllProducts(sortedProd)
		}else if(sortBy === 'otl'){
			const sortedProd = data.sort((a, b) =>
				new Date(a.createdOn) - new Date(b.createdOn)
			)
			setAllProducts(sortedProd)
		}else if(sortBy === 'htl'){
			const sortedProd = data.sort((a, b) =>
				new Number(b.price) - new Number(a.price)
			)
			setAllProducts(sortedProd)
		}else if(sortBy === 'lth'){
			const sortedProd = data.sort((a, b) =>
				new Number(a.price) - new Number(b.price)
			)
			setAllProducts(sortedProd)
		}

	}

	const handleChange = (event) => {
    	setSortBy(event.target.value);
  	}

	return (
		<div className="mx-1">
			{(user.isAdmin === true) ?
				<AdminView productsData={allProducts} fetchData={fetchData}/>

				:
			<>
					
				<div className="mx-5">
					<div className="py-3" style={{textAlign: 'right'}}>
						<Button style={{textDecoration: 'underline', fontWeight: '700'}} size="sm" variant="outline-success" className="mx-2" as={Link} to="/cart">View Cart</Button>
						<FormControl style={{width: '230px'}}>
							<InputLabel style={{fontSize: '15px', fontWeight: '900'}}>Sort By </InputLabel>
							<Select
							    defaultValue={'lto'}
							    label="Sort by:"
							    onChange={handleChange}
							    size="small"
							>
							    <MenuItem style={{fontSize: '15px'}} value={'lto'}><div style={{fontWeight: '700'}}>Latest to Oldest Product</div></MenuItem>
							    <MenuItem style={{fontSize: '15px'}} value={'otl'}><div style={{fontWeight: '700'}}>Oldest to Latest Product</div></MenuItem>
							    <MenuItem style={{fontSize: '15px'}} value={'htl'}><div style={{fontWeight: '700'}}>Price (High to Low)</div></MenuItem>
							    <MenuItem style={{fontSize: '15px'}} value={'lth'}><div style={{fontWeight: '700'}}>Price (Low to High)</div></MenuItem>
							</Select>
						</FormControl>
					</div>
						<UserView productsData={allProducts}/>
				</div>
			</>
			}
			
		</div>

		)
}