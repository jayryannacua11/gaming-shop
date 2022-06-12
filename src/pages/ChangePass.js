import { Form } from 'react-bootstrap';
import {Button, styled, TextField} from '@mui/material'
import { useState } from 'react';
import Swal from 'sweetalert2';



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
export default function ChangePass(){

	const [currentPass, setCurrentPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const [verifyPass, setVerifyPass] = useState('');

	const [warning, setWarning] = useState('');

	const [userId, setUserId] = useState('');

	let access = localStorage.getItem('accessToken')

	fetch('https://jaynacs-ecommerce.herokuapp.com/users/details', {
		headers: {
			Authorization: `Bearer ${access}`
		}
	})
	.then(res => res.json())
	.then(data => {
		setUserId(data._id)
	})

	function changePassword(event){
		event.preventDefault();

		//console.log(userId)


		if(newPass !== verifyPass){
			setWarning('Password does not match!')
		}else if(newPass === currentPass){
			setWarning('New Password cannot be the Old Password')
		}else if(newPass.length < 8){
			setWarning('Password must contain 8 characters or more')
		}else{
			setWarning('')

			fetch(`https://jaynacs-ecommerce.herokuapp.com/users/${userId}/password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${access}`
				},
				body: JSON.stringify({
					currentPass: currentPass,
					newPass: newPass
				})
			})
			.then(response => response.json())
			.then(data => {
				if(data){
					Swal.fire({ position: 'top-end', title: 'Success', icon: 'success', text: 'Password Changed'})
				}else{
					Swal.fire({ title: 'Oops', icon: 'error', text: 'Wrong Current Password'})
				}
			})
		}
	}

	return(
			<div className="container-fluid mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4 col-xxl-3">
						<Form onSubmit={event => changePassword(event)}>
							<h1>Change Password</h1>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  type="password"
								  value={currentPass} 
								  onChange={event => setCurrentPass(event.target.value)}
								  label="Current Password"
								  
							/>
							</Form.Group>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  type="password"
								  value={newPass} 
								  onChange={event => setNewPass(event.target.value)}
								  label="New Password"
								  helperText="Your password must contain at least 8 characters"
								  
							/>
							</Form.Group>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  type="password"
								  value={verifyPass} 
								  onChange={event => setVerifyPass(event.target.value)}
								  label="Confirm Password"  
							/>
							<div style={{fontWeight: 'bold', fontSize: '14px'}} className="text-danger px-3">{warning}</div>
								

							</Form.Group>
							<Button variant="contained" type="submit" color="warning" size="lg" className="px-5 py-3 mt-3">
								 Change Password
							</Button>
						</Form>
						</div>
					</div>
				</div>
						
		)
}