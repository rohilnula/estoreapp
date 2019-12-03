import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { get_current_location } from './ajax';

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: null,
            address: "Default Address",
            exchange: 0.0,
        };
    }

    redirect(path) {
        this.setState({address: path}); 
    }

    redirect2(path) {
        this.setState({exchange: path}); 
    }

    componentDidMount(){
        get_current_location(this);
    }

    render() {
       

        return (
            <div className='marginTopLogins' style={{border: '1px solid gray'}}>
                <Form.Label><span style={{color:'green', fontSize: 'large', fontWeight: 'bold'}}>API Fetch for Current Location and Exchange Rate:</span> <br/></Form.Label>
                 <Form.Group controlId="location">
                 <Form.Label>Your Current Location Address: </Form.Label>
                </Form.Group>
                <Form.Label><span style={{color:'red', fontSize: 'large'}}>{this.state.address}</span> <br/></Form.Label>

                <Form.Group controlId="location">
                 <Form.Label>Current USD to INR Exchange Rate: </Form.Label>
                </Form.Group>
                <Form.Label><Form.Label><span style={{color:'red', fontSize: 'large'}}>Rupees: {this.state.exchange}</span> <br/></Form.Label></Form.Label>
            </div>
        );
    }   
}


function state2props(state) {
    return state.forms.signup;
}

export default Location;