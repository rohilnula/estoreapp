import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Card, Button, Alert, Accordion } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';

import { get_all_buyers, add_Money } from '../ajax';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        let localStore = store.getState();
        let userID = localStore.session.user_id;
        //this.setState({userID: userID})
        this.state = {
            redirect: null,
            name: "",
            email: "",
            money: 0.0,
            userID: userID,
            displayMoney: 0.0,
            ordersClick: false,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.setState({displayMoney: data});
        console.log(this.state.displayMoney);
       /*  this.props.dispatch({
            type: 'ADD_MONEY',
            data: data,
        }); */

        //this.props.money = data;
    }

    componentDidMount(){
        var resp =  get_all_buyers().then((resp) => {
        var dataDisplay = resp.data;
      
        console.log(resp);
        var data = resp.data.filter((f) => {
            if (f.id == this.state.userID){
                return f;
            }
        })
        console.log(data);
        this.setState({name: data[0].name, email: data[0].email, money: data[0].money})});
        //console.log("response" + resp);
    }

    orderClick(){
        if(this.state.ordersClick === true){
            this.setState({
                ordersClick: false,
            });
        }else{
            this.setState({
                ordersClick: true,
            });
        }
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
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            My Purchases
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>                
            </div>
        );
    }
}

function Showpurchase(props) {
    var output = [];
    if(props.show == "show"){
        output.push(<h1>Show</h1>)
    }else{
        output.push(<h1>No Show</h1>)
    }

    return output;
}

function state2props(state) {
    return state.forms.buyerslogin;
}

export default connect(state2props)(Profile);