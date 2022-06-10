import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import {Select, InputLabel, MenuItem, FormControl} from '@mui/material';
import Swal from 'sweetalert2';

export default function EditProduct({productId, fetchData}){

	//editProduct Modal
	const [ showEdit, setShowEdit ] = useState(false)

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState();

	const openEdit = (productId) => {
		fetch(`http://localhost:4000/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setCategory(data.category)
			setPrice(data.price)
		})

		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false)
	}

	const editProduct = (event) => {
		event.preventDefault();

		fetch(`http://localhost:4000/products/${ productId }/update` ,{
			method: 'PUT',
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

			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product Successfully updated'
				})
				fetchData()
				closeEdit()
			}else{
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Please try again'
				})

				fetchData()
			}
		})
	}

	const handleChange = (event) => {
    	setCategory(event.target.value);
  	}

	return (
		<>
			<Button variant="info" size="sm" onClick={() => openEdit(productId)}>Update</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={event => editProduct(event)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Course</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control 
							      type="text"
							      required
							      value={name}
							      onChange={event => setName(event.target.value)}
							 />
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control 
							      type="text"
							      required
							      value={description}
							      onChange={event => setDescription(event.target.value)}
							 />
						</Form.Group>

						<Form.Group className="py-3">
							<FormControl style={{width: '100%'}}>
								<InputLabel>Category </InputLabel>
								<Select
								    label="Sort by:"
								    value={category}
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
							      onChange={event => setPrice(event.target.value)}
							 />
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>

				</Form>
			</Modal>
		</>

		)
}