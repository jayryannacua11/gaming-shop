import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

export default function ArchiveProduct( {productId, isActive, fetchData}) {

	//Disabling
	const archive = (productId) => {
		fetch(`http://localhost:4000/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product has been disabled'
				})

				fetchData()
			}else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong ...'
				})

				fetchData()
			}
		})
	}

	//Enabling
	const activate = (productId) => {
		fetch(`http://localhost:4000/products/${productId}/activate`, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data){
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product has been disabled'
				})

				fetchData()
			}else {
				Swal.fire({
					title: 'Error',
					icon: 'error',
					text: 'Something went wrong ...'
				})

				fetchData()
			}
		})
	}

	return(

		<>
			{isActive ?
				<Button variant="danger" size="sm" onClick={() => archive(productId)}>Disable</Button>

				:

				<Button variant="success" size="sm" onClick={() => activate(productId)}>Enable</Button>
			}

		</>

		)
}