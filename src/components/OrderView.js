import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function OrderView({data}){

	const [orders, setOrders] = useState([])

	useEffect(() => {
		const ordersArr = data.map(order => {
			return(
				<OrderCard key={order._id} orderProp={order} />
				)
		})
		setOrders(ordersArr)
	}, [data])

	return (
		<>
			<div className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center flex-wrap pb-5">
				{ orders }
			</div>
			
		</>

		)
}