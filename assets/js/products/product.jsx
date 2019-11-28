import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';

class Product extends React.Component {
    constructor(props) {
        super(props);
        let localStore = store.getState();
        let userID = localStore.session.user_id;
        //this.setState({userID: userID})
        this.state = {
            redirect: null,
            image: "",
            name: "",
            price: 0.0,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        60
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Product;