import { useState, useEffect } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCart } from "react-use-cart";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/DeleteForever';
import MButton from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Socials from '../components/Socials'

export default function CartView() {
	
	const [cart, setCart] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const [name, setName] = useState('');
	const [grandTotal, setGrandTotal] = useState(0);
	const navigate = useNavigate();
	const [storeData, setStoreData] = useState([])

	const fee = 200;
	const tax = 0.03;

	let storedData = JSON.parse(localStorage.getItem('cartitems'));

	function removeFromCart(i){
		storedData.splice(i, 1)
		localStorage.setItem('cartitems', JSON.stringify(storedData))
		window.location.reload(false)	
	}

	function incrementQty(i){
		if(storedData[i].quantity <	 40){
			storedData[i].quantity += 1;
			storedData[i].subTotal = storedData[i].quantity * storedData[i].price
		}
		localStorage.setItem('cartitems', JSON.stringify(storedData))
		window.location.reload(false)
		
	}

	function decrementQty(i){
		if(storedData[i].quantity >	 1){
			storedData[i].quantity -= 1;
			storedData[i].subTotal = storedData[i].quantity * storedData[i].price
		}
		localStorage.setItem('cartitems', JSON.stringify(storedData))
		window.location.reload(false)

	}

	useEffect(() => {
		if(localStorage.getItem('cartitems') == null){
			//localStorage.setItem('cartitems', '[]')
			Swal.fire({
				title: 'Nothing Here yet. Wanna to add a products?',
				icon: 'question',
				confirmButtonColor: "#b36b14",
			})
			navigate('/products')
		} else {
			const cartArr = storedData.map((cartitem, index) => {										
					
					setGrandTotal(prevGrandTotal => prevGrandTotal + cartitem.subTotal)
							
					return(
						<>
						<tr key={cartitem.productId}>
							<td className="text-center">{cartitem.name}</td>
							<td>&#8369; {cartitem.price}</td>
							<td style={{width: "10%"}} className="text-center" >																	
								<IconButton onClick={() => decrementQty(index)} size="small" color="primary">
									<RemoveCircleIcon />
								</IconButton>
								{cartitem.quantity}
								<IconButton onClick={() => incrementQty(index)} size="small" color="primary">
									<AddCircleIcon />
								</IconButton>			
							</td>
							<td style={{width: "20%"}} className="text-center">&#8369;{cartitem.subTotal}</td>
							<td style={{width: "10%"}}>
								<MButton onClick={() => removeFromCart(index)} variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
								        Delete
								</MButton>
							</td>
						</tr>
						
						</>
						)

			})
			setCart(cartArr)
			
		}
		}, [])

		const addToOrders = () => {
			if(storedData.length === 0) {
					Swal.fire({
					title: 'Nothing Here yet. Wanna to browse some products?',
					icon: 'question',
					confirmButtonColor: "#b36b14",
				}).then((result) => {
					if(result.isConfirmed){
					navigate('/products')
				}
			})
				
			} else {

				let newOrder = [];

				for(let i= 0; i<storedData.length; i++) {
					let cartItem = {
						productId: storedData[i].productId,
						quantity: storedData[i].quantity
					}
					newOrder.push(cartItem)
					
				}
				
				fetch('http://localhost:4000/orders/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
				},
				body: JSON.stringify(newOrder)
				})
				.then(res => res.json())
				.then(data => {

					if(data){
						Swal.fire({
						  position: 'top-end',
						  icon: 'success',
						  title: `You have successfully checkout all your cart items!`,
						  confirmButtonColor: "#b36b14",
						  showConfirmButton: false,
						  timer: 3000
						})
						localStorage.removeItem('cartitems');
						navigate('/')
					} else {
						Swal.fire({
							title: 'error!',
							icon: 'error',
							confirmButtonColor: "#b36b14",
							text: 'Something went wrong. Please try again :('
						})
					}
				})	

			}
		}

	return(

		<>
			<div className="my-4" >
				<h1> {`𝗠𝗬 𝗖𝗔𝗥𝗧`}</h1>
			</div>

<div className="container-fluid mt-2">
	<div className="row justify-content-center">
		<div className="cartTable col-12 col-md-8">
			<Table size="sm" style={{width:"100%"}} responsive>
				<thead className="bg-dark text-warning">
					<tr>
						<th className="text-center">{`𝗡𝗔𝗠𝗘`}</th>
						<th>{`𝗣𝗥𝗜𝗖𝗘`}</th>
						<th className="text-center">{`𝗤𝗨𝗔𝗡𝗧𝗜𝗧𝗬`}</th>
						<th className="text-center">{`𝗦𝗨𝗕𝗧𝗢𝗧𝗔𝗟`}</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{ cart }
				</tbody>	
			</Table>

		</div>
		<div className="col-10 col-sm-7 col-md-4">

			<Card style={{width: '16rem', height: 'auto', background: '#e1e4e8'}}>

			  <Card.Header className="text-center" style={{background: 'orange'}}>
			  	<h4>Order Summary</h4>
			  </Card.Header>
			  <Card.Body style={{fontSize: '20px'}}>
			    <div><span>Subtotal </span> <span style={{float: 'right', fontWeight: '500'}}>&#8369; {grandTotal}</span></div>
			    <div><span>Tax </span> <span style={{float: 'right', fontWeight: '500'}}>{tax*100}%</span></div>
			    <div><span>Shipping </span> <span style={{float: 'right', fontWeight: '500'}}>&#8369; {fee}</span></div>
			    
			    <hr/>
			    <div><span>Total </span> <span style={{float: 'right', fontWeight: '500'}}>&#8369; {(grandTotal+(grandTotal*tax)+fee).toFixed(2)}</span></div>
			  </Card.Body>
			  <Card.Footer>
				    <div className="d-grid gap-2">
				    	<Button style={{display: "block"}} size="sm" variant="dark"  onClick={() => addToOrders(cart)}> {`𝗖𝗛𝗘𝗖𝗞𝗢𝗨𝗧`} </Button>
				  	</div>
			  	</Card.Footer>
			</Card>
		</div>
	</div>
</div>

		<div className="container-fluid mt-5">
			<div className="row justify-content-center justify-content-md-start">
				<div className="col-12 col-sm-8 col-md-6" style={{fontSize: "18px"}}>
					<Socials className="mx-auto mx-md-0" />
				</div>	
			</div>
		</div>
					
		</>

		)
}