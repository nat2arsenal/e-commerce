import {Navigate} from 'react-router-dom';

import {useContext, useEffect} from 'react';

import UserContext from '../UserContext';

export default function Logout() {

	// consume the UserContext object and destructure it to access the user state and run the unsetUser function from context provider
	const {unsetUser, setUser} = useContext(UserContext);

	// localStorage.clear()

	// Function (this is defined from App.js) to clear the localStorage of the user's information
	unsetUser();

	useEffect(() => {
		setUser({id: null});
	})

	return (
		<Navigate to="/login" />
	)
};