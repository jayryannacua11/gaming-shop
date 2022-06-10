import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import AddProduct from './ProductAdd';
import EditProduct from './ProductEdit';
import ArchiveProduct from './ProductArchive';


export default function AdminView(props){

	const { productsData, fetchData } = props;

	const [ products, setProducts ] = useState([])

	useEffect( () => {

		const productsArr = productsData.map(product => {
			return(
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{parseFloat(product.price).toFixed(2)}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
						{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td>
						<EditProduct productId={product._id} fetchData={fetchData} />
					</td>
					<td>
						<ArchiveProduct productId={product._id} isActive={product.isActive} fetchData={fetchData} />
					</td>					
				</tr>

				)
		})
		setProducts(productsArr)
	}, [productsData] )
	
	return(
		<div className="mx-5">
			<div className="text-center my-4">
				<h1 className='lobster'>Admin Dashboard</h1>
			</div>

			<div className="text-end">
				<AddProduct fetchData={fetchData}/>
			</div>

			<Table striped bordered hover
			className="text-center table table-sm">
				<thead className="bg-dark text-white">
					<tr>
						<th style={{width: '1%'}}>ID</th>
						<th style={{width: '15%'}}>NAME</th>
						<th style={{width: '10%'}}>DESCRIPTION</th>
						<th style={{width: '5%'}}>PRICE</th>
						<th style={{width: '10%'}}>AVAILABILITY</th>
						<th colSpan="2" style={{width: '10%'}}>ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{products}
				</tbody>
				
			</Table>
		</div>
		)
}