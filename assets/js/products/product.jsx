import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router';
import store from '../store';

class Product extends React.Component {
    constructor(props) {
        super(props);
        let localStore = store.getState();
        let userID = localStore.session.user_id;
        //this.setState({userID: userID})
        this.state = {
            redirect: null,
            image: "",
            name: "",
            price: 0.0,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    render() {
        if (this.state.redirect != null) {
            return <Redirect to={this.state.redirect} />
        }
        
        //console.log(this.props.imageSource);
        //ratings
        let r = this.props.rating;
        var rating = [];
        for (let i=0; i < r; i++){
            rating.push(<i className="fas fa-star" style={{color:'orange'}}></i>);
        }
       //, backgroundColor: 'red
     //console.log("hello "+ 5 - r);
        return (
        <div className='card' style={{ width: '18rem', 'maxHeight':'150px'}}>
            <Card  style={{ display: 'block'}} >
                <Card.Img style={{ height:'200px' }} variant="top" src={this.props.imageSource} />
                <Card.Body>
                    <Card.Title><span style={{color:'blue', fontSize: 'large'}}>{this.props.productName}</span></Card.Title>
                    <Card.Text>
                    {rating} <br/>
                        Price: <span style={{color:'red', fontSize: 'large'}}>${this.props.price}</span> 
                       {/* <div style={{ display: 'inline-block', lineHeight:'10px'}} className='ml-3'>
                        {rating}
                        </div> */}
                    </Card.Text>
                    <Button variant="primary" onClick={() => this.redirect("/productDetails/" + this.props.productId)}>See Details</Button>
                    
                </Card.Body>
            </Card>
            </div>    
        );
    }
}

export default Product;