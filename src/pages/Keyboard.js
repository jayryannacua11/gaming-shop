import UserView from '../components/ViewUser';
import AdminView from '../components/ViewAdmin';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import {Select, InputLabel, MenuItem, FormControl} from '@mui/material';
import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';

import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Keyboard(){

	const { user } = useContext(UserContext);

	const [ allProducts, setAllProducts] = useState([]);
	const [sortBy, setSortBy] = useState('');

	const fetchData = () => {
		fetch('http://localhost:4000/products/all')
		.then(res => res.json() )
		.then(data => {

			let kbArr = [];
			for(let i=0; i<data.length; i++){
				if(data[i].category === "keyboard"){
					kbArr.push(data[i])
				}
			}

			const sortedKb = kbArr.reverse();
			setAllProducts(sortedKb)

			sortProd(kbArr)			
		})
	}

	useEffect(() => {
		fetchData()
	}, [sortBy])

	const sortProd = (data) => {
		if(sortBy === 'lto'){
			const sortedProd = data.sort((a, b) =>
				new Date(b.createdOn) - new Date(a.createdOn)
			)
			setAllProducts(sortedProd)
		}else if(sortBy === 'otl'){
			const sortedProd = data.reverse();
			setAllProducts(sortedProd)
		}else if(sortBy === 'htl'){
			const sortedProd = data.sort((a, b) =>
				new Number(b.price) - new Number(a.price)
			)
			setAllProducts(sortedProd)
		}else if(sortBy === 'lth'){
			const sortedProd = data.sort((a, b) =>
				new Number(a.price) - new Number(b.price)
			)
			setAllProducts(sortedProd)
		}

	}

	const handleChange = (event) => {
    	setSortBy(event.target.value);
  	}

	return (
		<>
			{(user.isAdmin === true) ?
				<>
				<AdminView productsData={allProducts} fetchData={fetchData}/>
				</>

				:
				<>
		<div className="mx-sm-5">
			<div className="container-fluid mt-5">
				<div className="row align-items-end">

					<div className="col-md-7">
						<h1 className="lobster" style={{textDecoration: 'underline', display: 'inline'}}>Gaming Keyboards</h1>
						<KeyboardOutlinedIcon style={{fontSize: '40px'}}/>
						<p style={{textAlign: 'justify'}}>
							Gaming keyboards are available with a variety of switch types: OmniPoint adjustable mechanical switches, red mechanical, brown mechanical, blue mechanical, hybrid mechanical, and membrane, all with extreme durability and performance.
						</p>
					</div>
					<div className="col-md-5" style={{textAlign: 'right'}}>
						<Button style={{textDecoration: 'underline', fontWeight: '700'}} size="sm" variant="outline-success" className="mx-2" as={Link} to="/cart">View Cart</Button>
						<FormControl style={{width: '230px'}}>
							<InputLabel style={{fontSize: '15px', fontWeight: '900'}}>Sort By </InputLabel>
							<Select
							    defaultValue={'lto'}
							    label="Sort by:"
							    onChange={handleChange}
							    size="small"
							>
							    <MenuItem style={{fontSize: '15px'}} value={'lto'}><div style={{fontWeight: '700'}}>Latest to Oldest Product</div></MenuItem>
							    <MenuItem style={{fontSize: '15px'}} value={'otl'}><div style={{fontWeight: '700'}}>Oldest to Latest Product</div></MenuItem>
							    <MenuItem style={{fontSize: '15px'}} value={'htl'}><div style={{fontWeight: '700'}}>Price (High to Low)</div></MenuItem>
							    <MenuItem style={{fontSize: '15px'}} value={'lth'}><div style={{fontWeight: '700'}}>Price (Low to High)</div></MenuItem>
							</Select>
						</FormControl>
					</div>

				</div>
			</div>

					<UserView productsData={allProducts}/>
		</div>
				</>
			}
		</>

		)
}