import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { Container, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Cart from '../pages/Cart'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton'

import { useParams, Link, useNavigate } from 'react-router-dom';


export default function SpecificProduct() {

	const { user } = useContext(UserContext);

	const navigate = useNavigate();

	const { productId } = useParams();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [quantity, setQuantity] = useState(0);
	const [subTotal, setSubTotal] = useState(quantity * price);
	const [cart, setCart] = useState([]);



	useEffect( () => {

		fetch(`http://localhost:4000/products/${ productId }`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

		setSubTotal(quantity * price)

	}, [subTotal, quantity])

	function decrementQuantity () {
		setQuantity(prevQuantity => prevQuantity - 1)
		if(quantity === 0) {
			setQuantity(0)
		}
	}

	function incrementQuantity () {
		setQuantity(prevQuantity => prevQuantity + 1)
		if(quantity === 50){
			setQuantity(50)
		}	
	}


	const addToCart = async (itemId, quant, sub) => {
		if(await quant === 0) {
			Swal.fire({
				title: 'Quantity cannot be zero',
				icon: 'error'
			})
		} else {

			let newCartItem = {
				productId: itemId,
				name: name,
				price: price,
				quantity: quant,
				subTotal: sub
			}

			//save an empty array if nothing is stored yet
			if(localStorage.getItem('cartitems') == null){
				localStorage.setItem('cartitems', '[]')
			}

			//gets previously stored data if there's any
			let storedData = JSON.parse(localStorage.getItem('cartitems'));

			let newCartArr = [];
			let prodExist = false;

			for (let i=0; i<storedData.length; i++){
				if(storedData[i].productId === itemId){
					storedData[i].quantity += quant;
					prodExist = true;
				}
				newCartArr.push(storedData[i])
			}

			if(!prodExist){
				newCartArr.push(newCartItem)
			}

			//Try using this

			// let prodExist = storedData.find(list => list.productId)
			// if(prodExist){
			// 	list.quantity += quant;
			// 	newCartArr.push(list)
			// }else newCartArr.push(newCartItem)


			
			localStorage.setItem('cartitems', JSON.stringify(newCartArr));
				
			Swal.fire({
				 position: 'top-end',
				 icon: 'success',
				 title: `Successfully added ${name} to your cart!`,
				 showConfirmButton: false,
				 timer: 3000
			})

			navigate('/products')
			}
		
	}

	return(
	<>

<div className="container-fluid mt-5">
	<div className="row justify-content-center">
		<div className="col-12 col-lg-8 order-2 order-lg-1">
			<div className="container-fluid">
			<div className="text-muted" style={{fontWeight: '700', fontStyle: 'italic'}}>
				*Dummy images are for visual purposes only so that the interface is not so dry
			</div>
			<div className="text-muted" style={{fontWeight: '700', fontStyle: 'italic', fontSize: '12px'}}>
				PS: Wanted to add actual images but the deadline of this project is near :(
			</div>
				<div className="row justify-content-center">

					<div className="col-md-12 specImg1"></div>

					<div className="col-md-6 specImg2"></div>

					<div className="col-md-6 specImg3"></div>

					<div className="col-md-12 specImg4 mb-5"></div>
				</div>
			</div>
			
		</div>

		<div className="col-10 col-lg-4 order-1 order-lg-2" style={{position: 'sticky'}}>
			<Card style={{position: 'sticky', top: 30, background: '#e1e4e8'}}>
				<Card.Header style={{background: 'orange'}}>
					<h4>{ name }</h4>
				</Card.Header>

				<Card.Body>
					<li className="ps-2 pb-4" style={{fontSize: '18px'}}>{ description }</li>
					<h6>Price: &#8369;{price} </h6>
				</Card.Body>

				<Card.Footer>
					{ user.accessToken !== null ?
						<>	
							<div>
								<div style={{display: 'inline', fontSize: '14px', fontWeight: '700'}}>Quantity:</div>
								<IconButton onClick={decrementQuantity} size="small" style={{color: 'black'}}>
										<RemoveCircleIcon />
									</IconButton>
									<div style={{display: 'inline', fontWeight: '700', fontSize: '18px'}}>{quantity}</div>
									<IconButton onClick={incrementQuantity} size="small" style={{color: 'black'}}>
										<AddCircleIcon />
								</IconButton>

								<div style={{display: 'inline', fontSize: '22px', float: 'right', fontWeight: '700'}}>&#8369;{(subTotal).toFixed(2)}</div>


							</div>
							
							
							
							<div className="d-grid gap-2 pt-3">
								<Button style={{display: "block"}} variant="dark" 
									onClick={() => addToCart(productId, quantity, subTotal)}>
									Add to Cart
								</Button>
							</div>
						</>
						:
						<>
						<div className="d-grid gap-2">
							<Button style={{display: "block"}} variant="warning" as={Link} to="/login">
								Login to Order
							</Button>
						</div>
						</>
					}
				</Card.Footer>
			</Card>
		</div>
	</div>
</div>

	</>
		

		)



}