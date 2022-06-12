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
	const [productImage, setProductImage] = useState('');

	//Modal
	const [ showAdd, setShowAdd ] = useState(false);
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	//Add Product
	const addProduct = (event) => {
		event.preventDefault();

		let formData = new FormData()
		formData.append('name', name)
		formData.append('productImage', productImage)
		formData.append('description', description)
		formData.append('category', category)
		formData.append('price', price)
		
		// console.log(formData)
		// const jsonFormData = JSON.stringify(formData)
		// console.log(jsonFormData)
		fetch('https://jaynacs-ecommerce.herokuapp.com/products/addProduct', {
			method: 'POST',
			headers: {				
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: formData
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
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
			setProductImage('')
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
				<Form onSubmit={event => addProduct(event)} method="POST" encType="multipart/form-data">
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
						<Form.Group className="py-2">
							<Form.Label>Upload Image</Form.Label>
							<Form.Control 
							type="file"
							name='productImage' 
							required
							onChange = {event => setProductImage(event.target.files[0])} 
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