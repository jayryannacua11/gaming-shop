import { Form } from 'react-bootstrap';
import Policy from '../components/Policy'
import { grey } from '@mui/material/colors';
import {Button, styled, TextField} from '@mui/material'

import { useState, useContext } from 'react';
import Swal from 'sweetalert2';

import UserContext from '../UserContext'
import { Link, useNavigate } from 'react-router-dom';

	const CssTextField = styled(TextField)({
	  '& label.Mui-focused': {
	    color: '#663399',
	  },
	  '& .MuiInput-underline:after': {
	    borderBottomColor: '#663399',
	  },
	  '& .MuiOutlinedInput-root': {
	    '& fieldset': {
	      borderColor: 'black',
	    },
	    '&:hover fieldset': {
	      borderColor: 'black',
	    },
	    '&.Mui-focused fieldset': {
	      borderColor: '#663399',
	    },
	  },
	});

	const ColorButton = styled(Button)(({ theme }) => ({
	  color: theme.palette.getContrastText(grey[900]),
	  backgroundColor: grey[900],
	  '&:hover': {
	    backgroundColor: grey[800],
	  },
	}));

export default function Register(){

	//const { user } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPass, setVerifyPass] = useState('');

	const [warning, setWarning] = useState('');
	const [taken, setTaken] = useState('');
	const navigate = useNavigate();

	function registerUser(event){
		event.preventDefault();

		if(password !== verifyPass){
			setWarning('Password does not match!')
		}else{
			setWarning('')

			fetch('http://localhost:4000/users/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: email,
					password: password
				})

			})
			.then(response => response.json())
			.then(data => {
				if(data.message === `Email is already taken!`){
					setTaken('Email is already taken!')
				}else if(data){
					Swal.fire({ title: 'Success', icon: 'success', text: 'Registered Sucessfully!'})
					navigate('/login')
				}
			})

		}
	}
	
	return (
		<>
			<div className="container-fluid mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4 col-xxl-3">
						<Form onSubmit={event => registerUser(event)}>
							<h1>Join Today!</h1>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  type="email"
								  
								  label="Email Address"
								  placeholder="example@gmail.com"
								  value={email} 
								  onChange={event => setEmail(event.target.value)}
							/>
							</Form.Group>
							<div style={{fontWeight: 'bold'}} className="text-danger px-3">{taken}</div>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  type="password"
								  
								  label="Password"
								  helperText="Your password must contain at least 8 characters"
								  value={password} 
								  onChange={event => setPassword(event.target.value)}
							/>
							</Form.Group>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  type="password"
								  
								  label="Confirm Password"
								  value={verifyPass} 
								  onChange={event => setVerifyPass(event.target.value)}
							/>
							<div style={{fontWeight: 'bold'}} className="text-danger px-3">{warning}</div>
								

							</Form.Group>
							<Form.Group className="pt-1">
								<Policy />				
							</Form.Group>
							<Button variant="contained" type="submit" color="warning" size="lg" className="px-5 py-3 mt-3">
								 Register
							</Button>
						</Form>
						
					</div>

					<div className="col-md-6 col-lg-4 col-xxl-3 mt-4 mt-md-0">
						<h1 className='lobster'>Existing member?</h1>
						<p className="pt-3">Already receiving exclusing benefits as a member? Just Log in directly!</p>
						<div className="mt-5">
							<ColorButton variant="dark" size="lg" 
							className="px-5 py-3"
							style={{textDecoration: 'none', color: 'white'}}
							as={Link} to="/login">
							 Log in
						</ColorButton>
						</div>
						
					</div>
				</div>
			</div>
		</>
		)
}