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
        console.log(this.props.imageSource);
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.imageSource} />
                <Card.Body>
                    <Card.Title>Product Name: {this.props.productName}</Card.Title>
                    <Card.Text>
                        Price: {this.props.price}
                    </Card.Text>
                    <Button variant="primary">Buy</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Product;