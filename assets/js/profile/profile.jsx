import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Card, Button, Alert, Accordion, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';

import { get_all_buyers, add_Money, get_all_purchases } from '../ajax';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        let localStore = store.getState();
        let userID = localStore.session.user_id;
        let userName = localStore.session.user_name;
        this.state = {
            redirect: null,
            name: "",
            email: "",
            money: 0.0,
            userID: userID,
            userName: userName,
            displayMoney: 0.0,
            purchase_data: [],
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.setState({displayMoney: data});
       /*  this.props.dispatch({
            type: 'ADD_MONEY',
            data: data,
        }); */

        //this.props.money = data;
    }

    componentDidMount(){
        var resp =  get_all_buyers().then((resp) => {
        var dataDisplay = resp.data;
      
        var data = resp.data.filter((f) => {
            if (f.id == this.state.userID){
                return f;
            }
        });
        this.setState({name: data[0].name, email: data[0].email, money: data[0].money})});

        var resp_purchases =  get_all_purchases().then((resp_purchases) => {      
            var data_purchases = resp_purchases.data.filter((f) => {
                if (f.user_name == this.state.userName){
                    return f;
                }
            });
        this.setState({purchase_data: data_purchases})
        });
        
    }

    render() { 
        

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let {email, id, name, password_hash, errors} = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>;
        }

        return (
            
            <div>
                <h1>Profile Page</h1>
                { error_msg }
                <Form.Group controlId="email">
                    <Form.Label>Email:: </Form.Label>
                    <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name::</Form.Label>
                    <Form.Label>{this.state.name}</Form.Label>
                </Form.Group>
                <Form.Group controlId="money">
                    <Form.Label>Current Amount:  </Form.Label>
                    <Form.Label>{this.state.money}</Form.Label>
                </Form.Group>
                <Form.Group controlId="submit">
                    <Form.Label>Add Money</Form.Label>
                    <Form.Control type="text" value = {this.state.displayMoney} onChange={
                        (ev) => this.changed( ev.target.value)} />
                    <Button variant="primary" onClick={() => add_Money(this.state.displayMoney, this, this.state.money)}>
                       Add Money
                    </Button>
                </Form.Group>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            My Purchases
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body><Showpurchase purchases = {this.state.purchase_data}/></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>                
            </div>
        );
    }
}

function Showpurchase(props) {
    console.log(JSON.stringify(props.purchases) + "=======================")
    const purchases = props.purchases
    var output = []
    var head = []
    var body = []
    if(purchases.length === 0){
        output.push(<h1>No purchases!</h1>)
    }else{
        head.push(<thead><tr><th>Product Name</th><th>Quantity Purchased</th><th>Price</th></tr></thead>)
        for(let i = 0; i < purchases.length; i++){
            var data = purchases[i];
            body.push(<tr><td>{data.product_name}</td><td>{data.quantity}</td><td>{data.price}</td></tr>);
        }
        output.push(<Table>
            {head}
            <tbody>
                {body}
            </tbody>
        </Table>);
    }
    return output;
}

function state2props(state) {
    return state.forms.buyerslogin;
}

export default connect(state2props)(Profile);