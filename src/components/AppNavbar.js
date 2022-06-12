import { useState, useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {Button, IconButton} from '@mui/material';
import '../App.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Brand from '../brand.jpg'

import { Link } from 'react-router-dom';
import UserContext from '../UserContext';


export default function NavBar(){

	const { user } = useContext(UserContext);

	return(
		<>			
			<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="ps-1">
			  <Navbar.Brand className="px-2" style={{fontWeight: '900'}}>
			  		<img
				        src={Brand}
				        width="30"
				        height="30"
				        className="d-inline-block align-top"
				        alt="Shop logo"
			      	/>		
			  		Nacs Gaming Shop
			  </Navbar.Brand>
			  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
			  <Navbar.Collapse id="responsive-navbar-nav">
			  	{(user.isAdmin !== true) ?
			  		<Nav className="me-auto">
				      	<Nav.Link as={Link} to="/">Home</Nav.Link>
				      	<NavDropdown			      		
	         				id="nav-dropdown-dark-example"
	          				title="Gaming Gear"
	          				menuVariant="dark"
	        			>
					        <NavDropdown.Item as={Link} to="/products/keyboard">Keyboards</NavDropdown.Item>
					        <NavDropdown.Item as={Link} to="/products/mice">Mice</NavDropdown.Item>
					        <NavDropdown.Item as={Link} to="/products/headset">Headsets</NavDropdown.Item>
					        <NavDropdown.Divider />
					        <NavDropdown.Item as={Link} to="/products">All Products</NavDropdown.Item>
				      	</NavDropdown>
			    	</Nav>

			    	:

			    	<Nav className="me-auto">
			      	<NavDropdown			      		
         				id="nav-dropdown-dark-example"
          				title="Gaming Gear"
          				menuVariant="dark"
        			>
				        <NavDropdown.Item as={Link} to="/products/keyboard">Keyboards</NavDropdown.Item>
				        <NavDropdown.Item as={Link} to="/products/mice">Mice</NavDropdown.Item>
				        <NavDropdown.Item as={Link} to="/products/headset">Headsets</NavDropdown.Item>
				        <NavDropdown.Divider />
				        <NavDropdown.Item as={Link} to="/products">All Products</NavDropdown.Item>
			      	</NavDropdown>
			    	</Nav>


			  	}
			    
			    <Nav className="px-md-5">
			    	{(user.accessToken === null) ? 
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

			    		:

			    		<>
			    		{(user.isAdmin !== true) ?
			    			<>
			    			<Nav className="me-auto">
						    	<NavDropdown
			         				id="nav-dropdown-dark-example"
			          				title="Account"
			          				menuVariant="dark">		        					        			
								    <NavDropdown.Item as={Link} to="/myOrders">Order History</NavDropdown.Item>
								    <NavDropdown.Item as={Link} to="/changePassword">Change Password</NavDropdown.Item>
								    <NavDropdown.Divider />
								    <Button
								    	className="text-center" 
					    		  		as={Link}
					    		  	 	style={{color: 'white', borderColor: 'white', display: 'block', fontWeight: '800'}}
					    		  	 	to="/logout"
					    		  	 	color="secondary"
					    		  	 	size="small" 
					    		  	 	>
					    		  		LOGOUT
				    		  		</Button>				    		
						      	</NavDropdown>
					      	</Nav>					      	

					      	<Nav.Link as={Link} to="/cart" style={{color: 'white'}}> <AddShoppingCartIcon /> </Nav.Link>
					      	</>
					     :
					     <>
					     	<Nav className="me-auto">
						    	<NavDropdown
			         				id="nav-dropdown-dark-example"
			         				drop="start"
			          				title="Account"
			          				menuVariant="dark">		        					        			
								    <NavDropdown.Item as={Link} to="/allOrders">Order History</NavDropdown.Item>
								    <NavDropdown.Divider />
								    <Button
								    	className="text-center" 
					    		  		as={Link}
					    		  	 	style={{color: 'white', borderColor: 'white', display: 'block', fontWeight: '800'}}
					    		  	 	to="/logout"
					    		  	 	color="secondary"
					    		  	 	size="small" 
					    		  	 	>
					    		  		LOGOUT
				    		  		</Button>				    		
						      	</NavDropdown>
					      	</Nav>	
					     </>
					 	}					      	
					      
			    		</>
			    			
			    	}
			    			    
			    </Nav>
			  </Navbar.Collapse>
			  
			</Navbar>
						
		</>
		)
}
