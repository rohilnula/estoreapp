import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_buyers_login } from '../ajax';

class BuyersLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_BUYERS_LOGIN',
            data: data,
        });
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
                <h1 style={{color:'blue', opacity: '0.5',margin:'25px'}}>Hello Buyer. Please login!</h1>
                
                { error_msg }
                <Form.Group controlId="email">
                    <Form.Label>Enter your Email</Form.Label>
                    <Form.Control type="text" onChange={
                        (ev) => this.changed({email: ev.target.value})} />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Enter your Password</Form.Label>
                    <Form.Control type="password" onChange={
                        (ev) => this.changed({password: ev.target.value})} />
                </Form.Group>
                <Form.Group controlId="submit">
                    <Button variant="primary" onClick={() => submit_buyers_login(this)}>
                        Log in
                    </Button>
                </Form.Group>
            </div>
        );
    }
}

function state2props(state) {
    return state.forms.buyerslogin;
}

export default connect(state2props)(BuyersLogin);