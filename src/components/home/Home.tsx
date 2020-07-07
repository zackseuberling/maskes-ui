import React from 'react';
import Aux from '../../hoc/Aux';
import Jumbotron from 'react-bootstrap/Jumbotron';

const Home = () => {
    return (
        <Aux>
            <div>This is Home Page</div>
            <Jumbotron>
                <h3>Test Login Account:</h3>
                <ul>
                    <li>email: testuser@email.com</li>
                    <li>password: password123</li>
                </ul>
            </Jumbotron>
        </Aux>
    )

};

export default Home;
