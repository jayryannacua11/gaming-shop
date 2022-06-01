import { Form } from 'react-bootstrap';
import { grey } from '@mui/material/colors';
import {Button, styled, TextField, FormControlLabel, Checkbox} from '@mui/material'

import { Link } from 'react-router-dom';
export default function Register(){

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
	
	return (
		<>
			<div className="container-fluid mt-5">
				<div className="row justify-content-center">
					<div className="col-md-6 col-xxl-5">
						<Form>
							<h1>Join Today!</h1>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  id="outlined-required"
								  label="Email Address"
								  placeholder="example@gmail.com"
							/>
							</Form.Group>
							<Form.Group className="pt-3">
								<CssTextField
								  fullWidth
								  required
								  id="outlined-required"
								  label="Password"
								  helperText="Your password must contain at least 8 characters"
							/>
							</Form.Group>
							<Form.Group className="pt-1">
								<Checkbox required/>
								<span className="policy">I have read and accept the</span>
									<Button class="btnPolicy px-1" style={{color: 'red'}} as={Link} to="/login" size="small">
								        Nacs Gaming Policy
								 	</Button>				
							</Form.Group>
							<Button variant="contained" color="warning" size="lg" className="px-5 py-3 mt-3">
								 Register
							</Button>
						</Form>
						
					</div>

					<div className="col-md-6 col-xxl-5 mt-4 mt-md-0">
						<h1>Existing member?</h1>
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