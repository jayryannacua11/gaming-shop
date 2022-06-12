import { useEffect, useState } from 'react';
import AllOrderView from '../components/AllOrderView';


export default function AllOrder(){


	const [allOrders, setAllOrders] = useState([])

	const fetchData = () => {
		fetch('https://jaynacs-ecommerce.herokuapp.com/orders/allOrders', {
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
		<>
			<div className="text-center my-4">
				<h1 className='lobster'>All Orders</h1>
			</div>
			<div className="pb-5 container-fluid mt-2">
				<div className="row justify-content-evenly">
					<div className="col-12 col-lg-10 col-xl-8 col-xxl-7">
						<AllOrderView ordersData={allOrders} fetchData={fetchData} />
					</div>
				</div>
			</div>
		</>

		)
}