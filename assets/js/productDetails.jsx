import React, { Component } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';

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
        this.state = {fadeIn: new Animated.Value(0), fadeOut: new Animated.Value(1)};
        
        this.fadeIn = this.quantityAsOptions.bind(this);        
        this.fadeOut = this.quantityAsOptions.bind(this);
    }
    
    fadeIn() {
     this.state.fadeIn.setValue(0)                  
     Animated.timing(
       this.state.fadeIn,           
       {
         toValue: 1,                   
         duration: 3000,              
       }
     ).start(() => this.fadeOut());                        
  	}

  	fadeOut() {
    	Animated.timing(                  
       	this.state.fadeIn,            
       	{
         	toValue: 0,                   
         	duration: 3000,              
       	}
    	).start();                        
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
           
           		<View style={{flex: 1, backgroundColor: '#efefef'}}>
           <TouchableOpacity 
               onPress={() => this.fadeIn()} 
               style={Styles.submitButtonStyle}
               activeOpacity={0.5}
           >
               <Text style={Styles.submitTextStyle}>Submit</Text>
           </TouchableOpacity>

           <Animated.View                 
              style={{opacity: this.state.fadeIn}}
           >
              <View style={Styles.textContainer}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Your order has been submitted</Text>
             </View>
           </Animated.View>
       </View>
       
       
       
       
           
           
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
