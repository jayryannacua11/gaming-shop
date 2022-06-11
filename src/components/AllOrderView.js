import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import OrderCheck from './OrderCheck'

export default function AllOrderView(props){

	const {ordersData, fetchData} = props;
	const [orders, setOrders] = useState([])

	useEffect( () => {
		const ordersArr = ordersData.map(order => {
			return(
				<tr key={order._id}>
					<td>{order._id}</td>
					<td>{order.userId}</td>
					<td className="text-center">&#8369; {order.totalAmount}</td>
					<td className="text-center">{order.purchasedOn.slice(0,10)}</td>
					<td style={{width: '1%'}}><OrderCheck orderData={order} /></td>
				</tr>
				)
		})
		setOrders(ordersArr)
	}, [ordersData, fetchData])

	return(
		<>
			<div className="text-center">
				<Table striped bordered hover size="sm" responsive>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>User ID</th>
							<th>Total Amount</th>
							<th>Date of Purchase</th>
						</tr>
					</thead>
					<tbody>
						{orders}
					</tbody>
				</Table>
			</div>
		</>
		)
}