import React from 'react';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_signup_form } from './ajax';

class ProductDetailsPage extends React.Component {
    constructor(props) {
        super(props);

        this.productId = props.match.params.id;
        console.log("productId");
        console.log(this.productId);

        this.quantityAsOptions = this.quantityAsOptions.bind(this);
    }

    quantityAsOptions(qty) {
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
                    <Button variant="primary" onClick={() => submit_add_cart(this)}>
                        Add to cart
                    </Button>
                </Form.Group>
               </div>
               {
                   /*
                   User review component to be added over here
                    */
               }
           </div>
       );
    }
}

function state2props(state) {
    return {products: state.forms.productDetails};
}

export default connect(state2props)(ProductDetailsPage);