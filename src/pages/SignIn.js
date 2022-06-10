import { Form } from 'react-bootstrap';
import { grey } from '@mui/material/colors';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import {Button, styled, TextField, Checkbox, Alert} from '@mui/material'

import { Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Login(){

	const ColorButton = styled(Button)(({ theme }) => ({
	  color: theme.palette.getContrastText(grey[900]),
	  backgroundColor: grey[900],
	  '&:hover': {
	    backgroundColor: grey[800],
	  },
	}));

	const navigate = useNavigate();

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	//Button
	const [isActive, setIsActive] = useState('')

	useEffect( () => {
		if(email !== '' && password !== ''){
			setIsActive(true);
		}else setIsActive(false);
	}, [email, password])

	function authentication(event){
		event.preventDefault();

		fetch('http://localhost:4000/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(response => response.json())
		.then(data => {

			if(data.accessToken !== undefined){
				localStorage.setItem('accessToken', data.accessToken);
				setUser({
					accessToken: data.accessToken
				})

				Swal.fire({ title: 'Sheesh', icon: 'success', text: 'Sucessfully Login!'})

				//Get user's details from our token
				fetch('http://localhost:4000/users/details', {
					headers: {
						Authorization: `Bearer ${data.accessToken}`
					}
				})
				.then(res => res.json())
				.then(data => {

					if(data.isAdmin === true){
						localStorage.setItem('isAdmin', data.isAdmin)

						setUser({
							isAdmin: data.isAdmin
						})

						navigate('/products')
					}else navigate('/') //If not admin, just redirect to home
				})
			}else{
				Swal.fire({
					title: 'Oops',
					icon: 'error',
					text: 'Wrong Credentials'
				})
			}
			//Clear input
			setEmail('')
			setPassword('')
		})
	}

	return (
		<>	
			<div className="container-fluid mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4 col-xxl-3">
						<Form onSubmit={event => authentication(event)}>
							<h1>Member Login</h1>
							<Form.Group className="pt-3">
								<TextField
								  fullWidth
								  required
								  id="outlined-required"
								  label="Email Address"
								  type="email"
								  value={email} 
								  onChange={event => setEmail(event.target.value)}
								  placeholder="example@gmail.com"
							/>
							</Form.Group>
							<Form.Group className="pt-3">
								<TextField
								  fullWidth
								  required
								  id="outlined-required"
								  label="Password"
								  type="password"
								  value={password}
								  onChange={event => setPassword(event.target.value)}
							/>
							</Form.Group>

							{isActive ? 
								<Button variant="contained" type="submit" color="warning" size="lg" className="px-5 py-3 mt-3">Log in</Button>
								:
								<Button variant="contained" type="submit" color="warning" size="lg" className="px-5 py-3 mt-3" disabled>Log in</Button>
							}
						</Form>
					</div>

					<div className="col-md-6 col-lg-4 col-xxl-3 mt-4 mt-md-0">
						<h1 className='lobster'>Become a member</h1>
						<p className="pt-3">Enjoy members-only pricing, early access to new products. Don't miss your chance and join today for FREE</p>
						<div className="mt-5">
							<ColorButton variant="dark" size="lg" 
							className="px-5 py-3"
							style={{textDecoration: 'none', color: 'white'}}
							as={Link} to="/register">
							 Sign Up
						</ColorButton>
						</div>
						
					</div>

				</div>
			</div>
		</>

		)
}