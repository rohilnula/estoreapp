import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Label,Button, Alert, InputGroup } from 'react-bootstrap';
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

        this.channel.on("" + this.productId, (data) => {
            get_all_reviews();
        });

    //     var resp =  get_all_reviews().then((resp) => {
    //     //var dataDisplay = resp.data;
      
    //     console.log(resp);
    //     var data = resp.data.filter((f) => {
    //         if (f.productId == this.productId){
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
        this.channel.push("addedReview", {productId: this.productId});
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
            
            reviewsList.push(<Form.Label><span style={{fontWeight:'bold'}}>{value.user}: </span><span style={{fontSize: 'large'}}>{value.review}</span></Form.Label>);
            reviewsList.push(<br/>);
        }
        // for(let i =0; i < this.state.reviews.length; i++){
        //     reviewsList.push(<Form.Label>{this.state.reviews[i].user}:{this.state.reviews[i].review}</Form.Label>);
        //     reviewsList.push(<br/>);
        // }
        console.log("reviewsList");
        console.log(reviewsList);
        return (
            
            <div style={{border: '2px solid gray',borderRadius: '20px' ,padding: '7px'}}>
                <h3><span style={{fontWeight:'bold', fontSize: 'large', color: 'red'}}>Customer Reviews</span></h3>
                { error_msg }
                <div className = 'overflowClass'>
                <Form.Group controlId="email">
                    
                    <Form.Label>{reviewsList}</Form.Label>
                </Form.Group>
                </div>
                <InputGroup  className='mt-3'>
               
                    <Form.Control   placeholder='Add Review' ref={this.inputRef}/>
                    <InputGroup.Append>
                    <Button className='ml-3' variant="primary" onClick={() => {
                        add_Review(this.inputRef.current.value, this, this.productId);
                        this.broadcastAddition();
                        }}>
                       Add Review
                    </Button>
                    </InputGroup.Append>
 
               
                </InputGroup>


            </div>
        );
    }
}

function state2props(state) {
    return {reviews: state.forms.userReviews};
}

export default connect(state2props)(Reviews);