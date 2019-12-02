import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_signup_form } from './ajax';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: null
        };
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_SIGNUP',
            data: data,
        });
    }

    redirect(path) {
        this.setState({path: path}); 
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let {email, password, errors} = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>;
        }

        return (
            <div className='marginTopLogins' style={{border: '1px solid gray'}}>
                <h1 style={{color:'blue', opacity: '0.5',margin:'25px'}}>Hello Seller. Please login!!</h1>
                <Form.Group controlId="Full Name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" onChange={
                        (ev) => this.changed({fullName: ev.target.value})} />
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" onChange={
                        (ev) => this.changed({email: ev.target.value})} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={
                        (ev) => this.changed({password: ev.target.value})} />
                </Form.Group>
                <Form.Group controlId="type">
                    <Form.Label>Select type of account</Form.Label>
                    <Form.Control as="select" onChange={
                        (ev) => this.changed({category: ev.target.value})}>
                            <option>Buyer</option>
                            <option>Seller</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="submit">
                    <Button variant="primary" onClick={() => submit_signup_form(this)}>
                        Sign Up
                    </Button>
                </Form.Group>
            </div>
        );
    }   
}


function state2props(state) {
    return state.forms.signup;
}

export default connect(state2props)(SignUp);