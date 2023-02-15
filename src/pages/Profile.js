import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

export default function UpdateProduct() {

	const {userId} = useParams();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [mobileNumber, setMobileNumber] = useState('');


	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details/${userId}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setEmail(data.email);
			setMobileNumber(data.mobileNumber);		
		})
	}, [userId])

	return (
		<div>
			<h2 className="text-center">User Profile</h2>
			<table className="table">
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>MOBILE NUMBER</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{mobileNumber}</td>
              </tr>
          </tbody>
        </table>
		</div>
	)
};

