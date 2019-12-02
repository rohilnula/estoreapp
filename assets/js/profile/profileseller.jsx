import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';

import { get_all_sellers} from '../ajax';

class ProfileSeller extends React.Component {
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
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    componentDidMount(){
        var resp =  get_all_sellers().then((resp) => {
        var dataDisplay = resp.data;
      
        var data = resp.data.filter((f) => {
            if (f.name === this.state.userName){
                return f;
            }
        });
        this.setState({name: data[0].name, email: data[0].email, money: data[0].money})});
        
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
                    <Form.Label>Email:</Form.Label>
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
            </div>
        );
    }
}

export default ProfileSeller;