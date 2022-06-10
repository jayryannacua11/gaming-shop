import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faYoutube,
	faFacebook,
	faDiscord,
	faTwitter,
	faInstagram
} from "@fortawesome/free-brands-svg-icons"

export default function Socials(){

	return (
		<>
			<h1 className="lobster" >Join our Community</h1>
			<div>Giveaways, gaming, gear... it's all here:</div>
			<div className="social-container mt-2" style={{borderBottom: '1px solid block'}}>
				<a href="www.facebook.com" className="facebook social"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
				<a href="youtube.com" className="youtube social"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
				<a href="discord.com" className="discord social"><FontAwesomeIcon icon={faDiscord} size="2x" /></a>
				<a href="instagram.com" className="instagram social"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
				<a href="twitter.com" className="twitter social"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
			</div>
		</>
		)
}