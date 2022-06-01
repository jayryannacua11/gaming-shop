import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Logout(){

	//Clear the localStorage of the user's information
	const { unsetUser, setUser } = useContext(UserContext);
	unsetUser();

	//Set the user state back to its original value
	useEffect( () => {
		setUser({
			accessToken: null
		})
	}, [])

	Swal.fire({ title: 'Sheesh', icon: 'success', text: 'Sucessfully Logout!'})

	return(
		<Navigate to="/login" />
		)
}