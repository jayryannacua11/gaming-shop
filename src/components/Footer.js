import Brand from '../brand.jpg'


export default function Footer(){

	return(

		<div class="pageFooter container-fluid bg-dark mt-3">
			<footer class="row text-white text-center">
				<section class="col my-2">	
					<img src={Brand} width="30" height="30" class="d-inline-block align-text-top rounded-circle" />
					<div className='ps-1' style={{display: 'inline', fontWeight: '900', textDecoration: 'iu'}}>Nacs Gaming Shop</div>
				</section>
			</footer>	
		</div>
		)
}