import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import ErrorImg from '../error.png'


export default function ErrorPage() {
	return (
		<>	
			<div className="mt-5 d-flex justify-content-center align-items-center">
				<div>
					<img src={ErrorImg} />
				</div>
				<div className="ps-2">
					<h1>Pro Gamers only</h1>
					<p>Make yourself worthy first!</p>
					<Button variant="primary" as={Link} to="/" style={{borderRadius: '20px'}}>Go Home</Button>
				</div>				
			</div>
		</>

		)

}