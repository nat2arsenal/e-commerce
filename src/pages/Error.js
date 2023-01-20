import {Row, Col} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default function Error() {

    return (
        <Row>
        	<Col className="p-5 text-center">
                <h1>Page Not Found</h1>
                <p>Go back to the <Link style={{textDecoration: 'none'}} to="/home">homepage</Link>.</p>
                
            </Col>
        </Row>
    )
};