import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert, Row, Col, Spinner,Card } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Reviews from './reviews/reviews';
//import {Font} from '@fortawesome/fontawesome-free'
//import {FontAwesomeIcon} from '@fortawesome';
//import {faCoffee} from '@fortawesome/free-solid-svg-icons';

import { add_to_cart } from './ajax';

class ProductDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.productId = props.match.params.id;
        this.quantity = 1;

        this.quantityAsOptions = this.quantityAsOptions.bind(this);
        this.state = {
            cartMessage: ""
        }
    }

    quantityAsOptions(qty) {
    	store.addNotification({
  			title: "Wonderful!",
  			message: "teodosii@react-notifications-component",
  			type: "success",
  			insert: "top",
  			container: "top-right",
  			animationIn: ["animated", "fadeIn"],
  			animationOut: ["animated", "fadeOut"],
  			dismiss: {
    			duration: 5000,
    			onScreen: true
  			}
		});
		
        let optionArr = [];
        let i = 1;
        while (qty > 0) {
            optionArr.push(<option>{i}</option>);
            ++i;
            --qty;
        }
        return optionArr;
    }

    changed(data) {
       	this.quantity = parseInt(data['purchasedQty']);
        this.props.dispatch({
            type: 'PRODUCT_DETAILS',
            data: data,
        });
    }
    changeState(){
        this.setState({cartMessage: 'Added to Cart'});
    }

    render() {
        /**
         * To the left of these have pics posted by the manufacturer embedded.
         * 
         * Have these to the right:
         * price
         * product description
         * sold or available
         * items to add
         * add to cart button
         * 
         * Have this to the bottom
         * user review
        */

        let selectedProduct = this.props.products.get(this.productId);
        var in_stock =  selectedProduct.remaining;
        var stockdisplay = in_stock > 0 ? true: false; 
        let r = selectedProduct.ratings;
        var rating = [];
        for (let i=0; i < r; i++){
            rating.push(<i class="fas fa-star" style={{color:'orange'}}></i>);
        }
       return (
           <div>
               
               <Row>
                   <Col md={5}>
                  <div className='image-ProductDetails'>
                   <img src={selectedProduct.photo} alt="" className="product-preview"/>
                   </div>
                   </Col>
                    <Col md={{span: 5}}>
                       
                <div className = "marginTop" style={{border: '1px solid gray'}}>
                    {/* <FontAwesomeIcon icon = "faCoffee"/> */}
                    Description:<br/><span  style={{fontWeight:'bold', fontSize: 'large', float: 'left'}}>{selectedProduct.description}</span><br/>    
                    Deal of the Day: <span style={{color:'red'}}>${selectedProduct.price}</span> <br/>
                   Product Name: <span>{selectedProduct.product_name}</span>
                    <br/><span>by Seller</span> <br/>
                    Ratings: <span>{rating}</span> <br/>
                    <span>Thanksgiving is over, No more Discount!</span>
                </div>
                    </Col>
                    <Col md={2} >
                    <div className = "marginTop" style={{border: '1px solid gray'}}>
                    <span style={{color:'red', fontSize: 'large'}}>$ {selectedProduct.price}</span> <br/>
                    <br/>
                    <span>No Free Return and Delivery</span> <br/>
                    {
                        stockdisplay ? (<span if style={{color:'green', fontSize: 'large'}}>In Stock.</span>) : (<span if style={{color:'red', fontSize: 'large'}}>Out of Stock.</span>)
                    }
                    <br/>
                    
                    <Form.Group controlId="quantity">
                    <Form.Label>Qty</Form.Label>
                    <Form.Control as="select" onChange={
                        (ev) => this.changed({purchasedQty: ev.target.value})}>
                            {this.quantityAsOptions(selectedProduct.remaining)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="addToCart">
                    <Button variant="outline-dark"  onClick={() => add_to_cart(this, selectedProduct.id, this.quantity)}>
                    <i class="fas fa-shopping-cart pull-left" style={{color:'black'}}></i> Add to cart
                   
                    </Button>
                  {/*   <Form.Label>{this.state.cartMessage}</Form.Label> */}
                </Form.Group>
                <h6>ships from and sold by E-Store</h6>
                </div>
                    </Col>
               </Row>
            <Row className='marginTop'>
                <Col>
               <Reviews id={this.productId} />
                </Col>
            </Row>
           </div>
       );
    }
}

function state2props(state) {
    return {products: state.forms.productDetails};
}

export default connect(state2props)(ProductDetailsPage);
