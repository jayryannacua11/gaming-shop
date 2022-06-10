import Socials from '../components/Socials'
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home(){

	return (
		<div className="home" style={{minHeight: '100vh', marginLeft: '-24px', marginRight: '-24px'}}>			
			<div className="container-fluid">
				<div className="mx-md-5 row justify-content-center justify-content-md-start">

					<div className="col-12 col-sm-8 col-md-7">
						<div className="pro" style={{fontSize: "24px"}}>
							Want to play like a Pro? It all starts by acting like one
						</div>
						<Button className="mt-2 px-5" style={{border: '3px solid #FC6D6D',fontWeight: '900', borderRadius: '20px', fontSize: '20px'}}
							size="sm" variant="outline-danger" as={Link} to="/products">Start Browsing</Button>
					</div>
					<div className="col-12 col-sm-8 col-md-7" style={{fontSize: "18px", marginTop: "200px"}}>
						<Socials className="mx-auto mx-md-0" />
					</div>
				</div>
			</div>
		</div>

		)
}