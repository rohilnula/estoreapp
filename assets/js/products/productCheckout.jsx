import React from 'react';

import { connect } from 'react-redux';
import { Form, Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { get_all_cart_items, placeOrder } from '../ajax';

class ProductCheckout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: null
        }
        this.getPurchasedQuantity = this.getPurchasedQuantity.bind(this);
    }

    componentDidMount() {
        get_all_cart_items(this.props.userName);
    }

    redirect(path) {
        this.setState({path: path});
    }

    getPurchasedQuantity(productId) {
        for (let [key, value] of this.props.cartItemBrief) {
            if (value.product_id === productId) {
                return value.quantity;
            }
        }
    }

    render() {
        console.log(this.props.money)
        if (this.state.path != null)
            return <Redirect to={this.state.path} />
        
        let cartOrders = [];
        let sum = 0;
        for (let [key, value] of this.props.cartItems) {
            console.log(value);
            sum += value.price * this.getPurchasedQuantity(value.id);
            cartOrders.push(
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={value.photo} />
                    <Card.Body>
                        <Card.Title>Product Name: {value.product_name}</Card.Title>
                        <Card.Text>
                            Price: {value.price}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        }

        return (
            <div>
                {
                 this.props.money < sum ? <h1>Insufficient balance. Try to add minimum of ${sum - this.props.money} to your account</h1> :   
                    <div>
                    {cartOrders}
                        <Form.Group style={{justifyContent: 'space-between', display: 'flex'}}className="mt-5">
                            <Form.Label>Total: {sum}</Form.Label>
                            <Button className="ml-5" variant="primary" onClick={() => placeOrder(this, sum)}>Place your order</Button>
                        </Form.Group>
                    </div>
                }
            </div>
        );
    }
}


function state2props(state) {
    return {userName: state.session.user_name, cartItems: state.forms.cartItems, cartItemBrief: state.forms.cartItemBrief, money: state.forms.amount.money};
}

export default connect(state2props)(ProductCheckout);