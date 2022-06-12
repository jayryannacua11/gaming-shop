import { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
//Import Link to pass the _id prop to SpecificCourse.js
import { Link } from 'react-router-dom';


export default function ProductCard( {productProp} ){

	const { _id, name, productImage, description, price} = productProp;
	console.log(productProp)
	return (

		<Card as={ Link } to={`/products/${_id}`} className="mt-3 productCard" 
			style={{width: '310px', height: '490px', textDecoration: 'none', color: 'black'}}>
			<Card.Body>
				<div className="cardImgContainer">
					<img class="prodimg" src={`http://localhost:4000/${productImage}`}/>
				</div>
				<Card.Title className="pt-2" style={{fontWeight: 800, fontSize: '20px'}}> {name} </Card.Title>
				<hr/>
				<Card.Subtitle>Php {price} </Card.Subtitle>
				<Card.Subtitle className="my-2">Description: </Card.Subtitle>
				<Card.Subtitle className="ms-3"> <li>{description}</li> </Card.Subtitle>											 
			</Card.Body>
			<div className="px-3 pb-3">
				<Button variant="dark" as={ Link } to={`/products/${_id}`}>Details</Button>
			</div>
		</Card>

		)
}