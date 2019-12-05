import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Card, Button, Alert, Accordion, Table } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';

import Location from '../location';

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
            money_data: [],
            flag: false,
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

    
    set_money(){
        this.setState({flag:true});
    }

    componentDidMount(){
        var resp =  get_all_buyers().then((resp) => {
        var dataDisplay = resp.data;
      
        var data = resp.data.filter((f) => {
            if (f.id == this.state.userID){
                this.setState({money_data: f});
                return f;
            }
        });
        console.log('data ' + JSON.stringify(data));
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
console.log('hi' + JSON.stringify(this.state.money_data));
        store.dispatch({
            type: 'CHANGE_AMOUNT',
            data: this.state.money_data,
        });
        //this.set_money();
        /* if(!this.state.flag){
        add_Money(this.state.displayMoney, this, this.state.money);} */
        return (
            
            <div>
                <Location/>
                { error_msg }
                <div className = "marginTopMore" style={{border: '1px solid gray'}}>
                <Form.Group controlId="email">
                    <Form.Label>Email: </Form.Label>
                    <span style={{fontWeight:'bold', fontSize: 'large'}}> <Form.Label>{this.state.email}</Form.Label> </span>
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <span style={{fontWeight:'bold', fontSize: 'large', color:'green'}}> <Form.Label>{this.state.name}</Form.Label></span>
                </Form.Group>
                </div>
                <div className = "marginTopMore" style={{border: '1px solid gray'}}>
                <Form.Group controlId="money">
                    <Form.Label>Money in Account:  </Form.Label>
                    <span style={{fontWeight:'bold', fontSize: 'large', color: 'red'}}><Form.Label>$ {this.state.money}</Form.Label></span>
                </Form.Group>
                <Form.Group controlId="submit">
                    <Form.Label>Add Money</Form.Label>
                    <Form.Control type="text" value = {this.state.displayMoney} onChange={
                        (ev) => this.changed( ev.target.value)} />
                    <Button className="mt-3" variant="primary" onClick={() => add_Money(this.state.displayMoney, this, this.state.money)}>
                       Add Money
                    </Button>
                </Form.Group>
                </div>
                <div className = "marginTopMore" style={{border: '1px solid gray'}}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            My Purchases
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body><Showpurchase purchases = {this.state.purchase_data}/></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>   
                </div>             
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