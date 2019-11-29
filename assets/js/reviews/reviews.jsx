import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Label,Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';

import { get_all_reviews, add_Review } from '../ajax';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        let localStore = store.getState();
        let userID = localStore.session.user_id;
        //this.setState({userID: userID})
        this.state = {
            redirect: null,
            reviews: [],
            inputText: "",
            product_id: props.id,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.setState({inputText: data});
        
       /*  this.props.dispatch({
            type: 'ADD_MONEY',
            data: data,
        }); */

        //this.props.money = data;
    }


    componentDidMount(){
        var resp =  get_all_reviews().then((resp) => {
        //var dataDisplay = resp.data;
      
        console.log(resp);
        var data = resp.data.filter((f) => {
            if (f.product_id == this.state.product_id){
                return f;
            }
        })
        console.log(data);
        this.setState({reviews: data});
        //console.log("response" + resp);
    })}
 

    render() { 
        

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let {email, id, name, password_hash, errors} = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>;
        }

        var reviewsList = [];
        for(let i =0; i < this.state.reviews.length; i++){
            reviewsList.push(<Form.Label>{this.state.reviews[i].user}:{this.state.reviews[i].review}</Form.Label>);
            reviewsList.push(<br/>);
        }
        console.log("reviewsList");
        console.log(reviewsList);
        return (
            
            <div>
                <h1>Reviews Page</h1>
                { error_msg }
                <Form.Label>Reviews:<br/> </Form.Label>
                <Form.Group controlId="email">
                    
                    <Form.Label>{reviewsList}</Form.Label>
                </Form.Group>

                <Form.Group controlId="submit">
                    <Form.Label>Add Review</Form.Label>
                    <Form.Control type="text" value = {this.state.inputText} onChange={
                        (ev) => this.changed( ev.target.value)} />
                    <Button variant="primary" onClick={() => add_Review(this.state.inputText, this, this.state.product_id)}>
                       Add Review
                    </Button>
                </Form.Group>
            </div>
        );
    }
}

function state2props(state) {
    return state.forms;
}

export default connect(state2props)(Reviews);