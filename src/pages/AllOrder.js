import { useEffect, useState } from 'react';
import AllOrderView from '../components/AllOrderView';


export default function AllOrder(){


	const [allOrders, setAllOrders] = useState([])

	const fetchData = () => {
		fetch('http://localhost:4000/orders/allOrders', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json() )
		.then(data => {

			//Latest to Oldest
			const sortedOrders = data.reverse();
			setAllOrders(sortedOrders)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return(
		<div className="m-5">
			<h1>All Order Page</h1>
			<AllOrderView ordersData={allOrders} fetchData={fetchData} />
		</div>
		)
}