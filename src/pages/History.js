import {useState, useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import {Select, InputLabel, MenuItem, FormControl} from '@mui/material';

import OrderView from '../components/OrderView';

export default function OrderPage(){

	const [myOrders, setMyOrders] = useState([])
	const [sortBy, setSortBy] = useState('')

	useEffect(() => {
		fetch('http://localhost:4000/orders/myOrder', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(response => response.json())
		.then(data => {
			
			const sortedOrders = data.reverse();
			setMyOrders(sortedOrders)

			sortOrder(data)					
		})

	}, [sortBy])

	
	const sortOrder = (data) => {
		if(sortBy === 'lto'){
			setMyOrders(data)
			//console.log(sortBy)
		}else if(sortBy === 'otl'){
			const sortedOrders = data.reverse()
			setMyOrders(sortedOrders)
			//console.log(sortBy)
		}else if(sortBy === 'htl'){
			const sortedOrders = data.sort((a, b) =>
				new Number(b.totalAmount) - new Number(a.totalAmount)
			)
			setMyOrders(sortedOrders)
			//console.log(sortBy)
		}else if(sortBy === 'lth'){
			const sortedOrders = data.sort((a, b) =>
				new Number(a.totalAmount) - new Number(b.totalAmount)
			)
			setMyOrders(sortedOrders)
			//console.log(sortBy)
		}

	}

	const handleChange = (event) => {
    	setSortBy(event.target.value);
  	}

	return(
		<>
			<div className="ms-5 mt-5 text-center">
				<h2 className= "lobster" style={{display: 'inline'}}>Order History:</h2>
				<div className="ps-2" style={{display: 'inline'}}>
					<FormControl style={{width: '250px', color: 'red'}}>
						<InputLabel style={{fontSize: '15px', fontWeight: '900'}}>Sort By </InputLabel>
						<Select
						    defaultValue={'lto'}
						    label="Sort by:"
						    onChange={handleChange}
						    size="small"
						>
						    <MenuItem style={{fontSize: '15px'}} value={'lto'}><div style={{fontWeight: '700'}}>Latest to Oldest Order</div></MenuItem>
						    <MenuItem style={{fontSize: '15px'}} value={'otl'}><div style={{fontWeight: '700'}}>Oldest to Latest Order</div></MenuItem>
						    <MenuItem style={{fontSize: '15px'}} value={'htl'}><div style={{fontWeight: '700'}}>Total Amount (High to Low)</div></MenuItem>
						    <MenuItem style={{fontSize: '15px'}} value={'lth'}><div style={{fontWeight: '700'}}>Total Amount (Low to High)</div></MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
			<div><OrderView data={myOrders}/></div>

		</>
		)

}