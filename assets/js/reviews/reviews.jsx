import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Label,Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';
import socket from '../socket';

import { get_all_reviews, add_Review } from '../ajax';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        let localStore = store.getState();
        let userID = localStore.session.user_id;
        //this.setState({userID: userID})
        this.state = {
            redirect: null
        };

        this.productId = props.id;
        this.inputRef = React.createRef();
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        // this.setState({inputText: data});
        
       this.props.dispatch({
            type: 'USER_REVIEW',
            data: data,
        });

        //this.props.money = data;
    }


    componentDidMount(){
        this.channel = socket.channel("userReview:" + this.productId, {});
        this.channel.join().receive("ok", (resp) => {
            
        });

        this.channel.on("" + this.product_id, (data) => {
            this.props.dispatch({
                type: 'USER_REVIEW',
                data: data,
            });
        });

    //     var resp =  get_all_reviews().then((resp) => {
    //     //var dataDisplay = resp.data;
      
    //     console.log(resp);
    //     var data = resp.data.filter((f) => {
    //         if (f.product_id == this.product_id){
    //             return f;
    //         }
    //     })
    //     console.log(data);
    //     // this.setState({reviews: data});
    //     //console.log("response" + resp);
    // })}
        get_all_reviews();
    }

    componentWillUnmount() {
        this.channel.leave();
    }
 
    broadcastAddition() {
        this.channel.push("" + this.product_id, {});
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

        var reviewsList = [];
        for (let [key, value] of this.props.reviews) {
            if (typeof value === "undefined")
                continue;
            
            reviewsList.push(<Form.Label>{value.user}:{value.review}</Form.Label>);
            reviewsList.push(<br/>);
        }
        // for(let i =0; i < this.state.reviews.length; i++){
        //     reviewsList.push(<Form.Label>{this.state.reviews[i].user}:{this.state.reviews[i].review}</Form.Label>);
        //     reviewsList.push(<br/>);
        // }
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
                    <Form.Control type="text" ref={this.inputRef}/>
                    <Button variant="primary" onClick={() => {
                        add_Review(this.inputRef.current.value, this, this.productId);
                        this.broadcastAddition();
                        }}>
                       Add Review
                    </Button>
                </Form.Group>
            </div>
        );
    }
}

function state2props(state) {
    return {reviews: state.forms.userReviews};
}

export default connect(state2props)(Reviews);