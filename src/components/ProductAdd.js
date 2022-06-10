import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {Select, InputLabel, MenuItem, FormControl} from '@mui/material';
import Swal from 'sweetalert2';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

export default function AddProduct({fetchData}) {

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState();

	//Modal
	const [ showAdd, setShowAdd ] = useState(false);
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	//Add Product
	const addProduct = (event) => {
		event.preventDefault();

		fetch('https://jaynacs-ecommerce.herokuapp.com/products/addProduct', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				category: category,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === 'Product is already on sale'){
				Swal.fire({
					title: 'Something went wrong ..',
					icon: 'error',
					text: 'Product is already on sale!'
				})
				fetchData()				
			}else {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product has been added'
				})

				closeAdd()
				fetchData()
			}

			//Reset all states input
			setName('')
			setDescription('')
			setPrice()
			setCategory('')
		})
	}

	const handleChange = (event) => {
    	setCategory(event.target.value);
  	}

	return(
		<>
			<div style={{display: 'inline', fontWeight: '500'}}>Click to Add Product -></div>
			<IconButton onClick={openAdd} color="primary">
				<AddCircleIcon />
			</IconButton>			

			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={event => addProduct(event)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control 
							type="text"
							required
							value={name}
							maxLength="30"
							onChange = {event => setName(event.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control 
							type="text"
							required
							value={description}
							maxLength="50"
							onChange = {event => setDescription(event.target.value)}
							/>
						</Form.Group>
						<Form.Group className="py-3">
							<FormControl style={{width: '100%'}}>
								<InputLabel>Category </InputLabel>
								<Select
								    label="Sort by:"
								    onChange={handleChange}
								    size="small"
								    required
								>
								    <MenuItem value={'mouse'}><div>Mouse</div></MenuItem>
								    <MenuItem value={'keyboard'}><div>Keyboard</div></MenuItem>
								    <MenuItem value={'headset'}><div>Headset</div></MenuItem>
								</Select>
							</FormControl>
						</Form.Group>
						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control 
							type="number"
							required
							value={price}
							onChange = {event => setPrice(event.target.value)}
							/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>	
				</Form>
			</Modal>

		</>

		)
}