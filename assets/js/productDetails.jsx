import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Reviews from './reviews/reviews';

import { add_to_cart } from './ajax';

class ProductDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.productId = props.match.params.id;
        this.quantity = 1;

        this.quantityAsOptions = this.quantityAsOptions.bind(this);
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
       return (
           <div>
               <img src={selectedProduct.photo} alt="" className="product-preview"/>
               <div className="product-info-container">
                   <h2>${selectedProduct.price}</h2>
                   <h3>{selectedProduct.product_name}</h3>
                   <h4>Ratings: {selectedProduct.ratings}</h4>
                   <span className="product-details">{selectedProduct.description}</span>
                   <Form.Group controlId="quantity">
                    <Form.Label>Select quantity</Form.Label>
                    <Form.Control as="select" onChange={
                        (ev) => this.changed({purchasedQty: ev.target.value})}>
                            {this.quantityAsOptions(selectedProduct.remaining)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="addToCart">
                    <Button variant="primary" onClick={() => add_to_cart(this, this.productId, this.quantity)}>
                        Add to cart
                    </Button>
                </Form.Group>
               </div>
               <Reviews id={this.productId} />
           </div>
       );
    }
}

function state2props(state) {
    return {products: state.forms.productDetails};
}

export default connect(state2props)(ProductDetailsPage);
