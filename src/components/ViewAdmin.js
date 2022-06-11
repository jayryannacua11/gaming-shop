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
		<div className="mx-sm-5">
			<div className="text-center my-4">
				<h1 className='lobster'>Admin Dashboard</h1>
				<AddProduct fetchData={fetchData}/>
			</div>

<div className="container-fluid mt-2">
	<div className="row justify-content-evenly">
		<div className="col-12 col-lg-9">
			<Table striped bordered hover size="sm" responsive className="text-center">
				<thead className="bg-dark text-white">
					<tr>
						<th >ID</th>
						<th >NAME</th>
						<th >DESCRIPTION</th>
						<th >PRICE</th>
						<th >AVAILABILITY</th>
						<th colSpan="2" >ACTIONS</th>
					</tr>
				</thead>
				<tbody>
					{products}
				</tbody>
				
			</Table>
		</div>
	</div>
</div>
			
		</div>
		)
}