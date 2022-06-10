import { useState } from 'react';

import {Box, Modal} from '@mui/material'
import { Button } from 'react-bootstrap';

	const style = {
	    position: 'absolute',
	    top: '50%',
	    left: '50%',
	    transform: 'translate(-50%, -50%)',
	    width: 'auto',
	    bgcolor: '#e1e4e8',
	    border: '2px solid #000',
	    boxShadow: 24,
	    borderRadius: '15px 50px',
	    padding: '10px 40px 20px 20px',
  	};

export default function OrderCheck({orderData}){

	const {_id, products, userId, totalAmount, purchasedOn} = orderData;
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		// console.log(orderData)
		// console.log(totalAmount)
		setOpen(true);
	}
	const handleClose = () => setOpen(false);

	const fee = 200;
	const tax = 0.03;

	return(
		<>
			<Button style={{fontWeight: 'bold'}} variant="outline-primary" size="sm" onClick={handleOpen}>View</Button>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style}>
				  <div style={{display: 'inline', fontSize: '25px'}}>Order# 
				  	<div style={{display: 'inline', textDecoration: 'underline'}}>{_id}</div>
				  </div>
				  <div>User ID: {userId}</div>
				  <div style={{display: 'flex', justifyContent: 'space-evenly'}}>

				  		<div className="pt-2">
						  	<div>Products</div>
						  	{products.map(product => <li className="ps-2">({product.quantity}) {product.productName}</li>)}
					  	</div>

					  	<div className="pt-4">
					  		<div>
					  			<div style={{display: 'inline'}}>Subtotal: <div style={{display: 'inline', float: 'right'}}>&#8369;{totalAmount}</div></div>
					  		</div>
					  		<div>
					  			<div style={{display: 'inline'}}>Tax: <div style={{display: 'inline', float: 'right'}}>{tax*100}%</div></div>
					  		</div>
					  		<div>
					  			<div style={{display: 'inline'}}>Fee: <div style={{display: 'inline', float: 'right'}}>&#8369;{fee}</div></div>
					  		</div>
					  		<hr style={{border: '1px solid black'}}/>
					  		<div>Total Amount: </div>
					  		<div>&#8369; {(totalAmount+(totalAmount*tax)+fee).toFixed(2)}</div>
					  	</div>
				  </div>

				  <div className="pt-3">
					  	<div className="ps-2" 
					  		style={{textDecoration: 'underline', fontStyle: 'italic', fontSize: '14px', display: 'inline'}}>
					  		Purchased Date: {purchasedOn.slice(0,10)}
					  	</div>
					  	<Button 
						    className="ms-1"
						    style={{fontWeight: 'bold', border: 'solid', float: 'right'}} 
						    variant="outline-danger" color="error" 
						    onClick={handleClose}>Close</Button>
				  </div>

				</Box>
			</Modal>
		</>
		)
}