import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_signup_form } from './ajax';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: null,
            isUserNameValid: false,
            isNameValid: false,
            isPasswordValid: false
        };
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_SIGNUP',
            data: data,
        });
        if (this.props.email != "") {
    		this.setState({isUserNameValid: false}); 
    	}
    	if (this.props.fullName != "") {
    		this.setState({isNameValid: false}); 
    	}
    	if (this.props.password != "") {
    		this.setState({isPasswordValid: false}); 
    	}
    }

    redirect(path) {
        this.setState({"path": path}); 
    }
    
    submitPressed() {
    	if (this.props.email == "") {
    		this.setState({isUserNameValid: true}); 
    	}
    	if (this.props.fullName == "") {
    		this.setState({isNameValid: true}); 
    	}
    	if (this.props.password == "") {
    		this.setState({isPasswordValid: true}); 
    	}
    	if ((this.props.email != "") && (this.props.fullName != "") && (this.props.password != "")) {
    		submit_signup_form(this)
    	}
    }

    render() {
        if (this.state.path != null) {
            return <Redirect to={this.state.redirect} />
        }

        let {email, password, errors} = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>;
        }

        return (
            <div className='marginTopLogins' style={{border: '1px solid gray'}}>
                <h1 style={{color:'blue', opacity: '0.5',margin:'25px'}}>Create Your Account</h1>
        		
                <Form noValidate validated={this.state.isNameValid}>
                	<Form.Group md="1" controlId="Full Name">
                    	<Form.Label>Full Name</Form.Label>
                    	<Form.Control
            				required
            				type="text"
            				placeholder="Full name"
            				onChange={(ev) => this.changed({fullName: ev.target.value})}
          				/>
          				<Form.Control.Feedback type="invalid">
            				Please provide a valid name.
          				</Form.Control.Feedback>
                	</Form.Group>
                </Form>
                <Form noValidate validated={this.state.isUserNameValid}>
                	<Form.Group md="1" controlId="username">
                    	<Form.Label>Email Address</Form.Label>
                    	<Form.Control
            				required
            				type="text"
            				placeholder="User Name"
            				onChange={(ev) => this.changed({email: ev.target.value})}
          				/>
          				<Form.Control.Feedback type="invalid">
            				Please provide a valid email address.
          				</Form.Control.Feedback>
                	</Form.Group>
                </Form>
                <Form noValidate validated={this.state.isPasswordValid}>
                	<Form.Group md="1" controlId="password">
                    	<Form.Label>Password</Form.Label>
                    	<Form.Control
            				required
            				type="text"
            				placeholder="Password"
            				onChange={(ev) => this.changed({password: ev.target.value})}
          				/>
          				<Form.Control.Feedback type="invalid">
            				Please provide a valid password.
          				</Form.Control.Feedback>
                	</Form.Group>
                </Form>
                
                <Form.Group controlId="type">
                    <Form.Label>Select type of account</Form.Label>
                    <Form.Control as="select" onChange={
                        (ev) => this.changed({category: ev.target.value})}>
                            <option>Buyer</option>
                            <option>Sellers</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="submit">
                    <Button variant="primary" onClick={() => this.submitPressed()}>
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
