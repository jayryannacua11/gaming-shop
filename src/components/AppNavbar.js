import { useState, useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import Button from '@mui/material/Button';
import '../App.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SendIcon from '@mui/icons-material/Send';

import { Link } from 'react-router-dom';
import UserContext from '../UserContext';


export default function NavBar(){

	const { user } = useContext(UserContext);

	return(
		<>			
			<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">		
			  <Navbar.Brand href="#home" className="px-2">React-Bootstrap</Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav">
			    <Nav className="me-auto">
			      	<Nav.Link as={Link} to="/" href="#features">Home</Nav.Link>
			      	<NavDropdown
         				id="nav-dropdown-dark-example"
          				title="Category"
          				menuVariant="dark"
        			>
				        <NavDropdown.Item href="#action/3.1">Keyboards</NavDropdown.Item>
				        <NavDropdown.Item href="#action/3.2">Mice</NavDropdown.Item>
				        <NavDropdown.Item href="#action/3.3">Headsets</NavDropdown.Item>
				        <NavDropdown.Divider />
				        <NavDropdown.Item href="#action/3.4">All Products</NavDropdown.Item>
			      	</NavDropdown>
			    </Nav>
			    <Nav className="px-md-5">
			    	{(user.accessToken !== null) ? 
			    		<div>
			    			<Button 
			    		  		as={Link}
			    		  	 	style={{ color: 'white', borderColor: 'white'}}
			    		  	 	to="/logout"
			    		  	 	variant="outlined"
			    		  	 	color="secondary"
			    		  	 	size="small" 
			    		  	 	endIcon={<SendIcon/>}>
			    		  		LOGOUT
			    		  	</Button>
			    		</div>

			    		:

			    		<>
			        	<div className="px-md-2">
			    	      	<Button as={Link} style={{ color: 'red' }} to="/register" variant="outlined" size="small" color="error">
			    	              SIGN UP
			    	       	</Button>
			           	</div>
			           	<div className="mt-2 mt-sm-0">
					      	<Button 
					      		as={Link}
					      	 	style={{ color: 'white', borderColor: 'white'}}
					      	 	to="/login"
					      	 	variant="outlined"
					      	 	className="text-light"
					      	 	size="small" 
					      	 	endIcon={<AccountCircleOutlinedIcon/>}>
					      		LOGIN
					      	</Button>
				    	</div>
			           	</>		
			    	}
			    			    
			    </Nav>
			  </Navbar.Collapse>
			  
			</Navbar>
						
		</>
		)
}