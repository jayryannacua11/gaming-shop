import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
//Import Link to pass the _id prop to SpecificCourse.js
import { Link } from 'react-router-dom';


export default function OrderCard( {orderProp} ){

	const { _id, purchasedOn, products, totalAmount} = orderProp;
	const [count, setCount] = useState([1])

	const fee = 200;
	const tax = 0.03;


	function sort(){
		let sortedOrders = orderProp.sort((a, b) => 
			new Date(...a.purchasedOn.split('/').reverse()) - new Date(...b.purchasedOn.split('/').reverse())
		)
		console.log(sortedOrders)
	}

	return (
		<Card className="mt-3 orderCard text-white bg-dark" style={{width: '75%', height: 'auto'}} variant="primary">
			<Card.Body>
				<div className="container-fluid">
					<Card.Title className="pt-2" style={{fontWeight: 500, fontSize: '20px'}}> 
						Order Number: 
						<div className="ps-2" style={{color: 'orange', fontWeight: 900, textDecoration: 'underline'}}>
						{_id}
						</div>
						<div className="pt-1"style={{fontSize: '16px'}}>
							Purchased On: {(purchasedOn.slice(0,10))}
						</div> 
					</Card.Title>
					<hr/>
				</div>
				<Card.Subtitle style={{fontSize: '18px'}}>Items</Card.Subtitle>
				<div className="ps-4 pt-2">
				{products.map(product => <span className="pe-2" style={{fontWeight: '700'}}> ({product.quantity}) {product.productName}</span>  )} 
				</div>
				<Card.Subtitle className="pt-3" style={{fontSize: '14px'}}>
					Subtotal: &#8369;{totalAmount} + Delivery Fee (&#8369;{fee}) + Tax ({tax*100}%)
				</Card.Subtitle>														 
			</Card.Body>
			<Card.Footer style={{fontWeight: 500, fontSize: '20px'}}>
				Total Amount:  
				<div className="ps-1" style={{color: 'orange', fontWeight: 900, display: 'inline-block'}}>
					&#8369;{(totalAmount+(totalAmount*tax)+fee).toFixed(2)}
				</div>
			</Card.Footer>
		</Card>

		)
}