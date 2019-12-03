import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_new_photo } from '../ajax';

function state2props(state) {
  return state.forms.new_photo;
}

class UploadProduct extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
      message: "",
      isProdIdValid: false,
      isProdNameValid: false,
      isDescValid: false,
      isDiscountValid: false,
      isPhotoValid: false,
      isPriceValid: false,
      isQtyValid: false
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_PHOTO',
      data: data,
    });
    if (this.props.productId != "") {
    	this.setState({isProdIdValid: false}); 
    }
    if (this.props.productName != "") {
    	this.setState({isProdNameValid: false}); 
    }
    if (this.props.desc != "") {
    	this.setState({isDescValid: false}); 
    }
    if (this.props.discount != "") {
    	this.setState({isDiscountValid: false}); 
    }
    if (this.props.remaining != "") {
    	this.setState({isPhotoValid: false}); 
    }
    if (this.props.price != "") {
    	this.setState({isPriceValid: false}); 
    }
    if (this.props.remaining != "") {
    	this.setState({isQtyValid: false}); 
    }
  }

  file_changed(ev) {
    let input = ev.target;
    let file  = null;
    if (input.files.length > 0) {
      file = input.files[0];
    }
    this.changed({file: file});
  }

  set_message(msg){
    this.setState({message: msg});
  }
  
  submitPressed() {
    	if (this.props.productId == "") {
    		this.setState({isProdIdValid: true}); 
    	}
    	if (this.props.productName == "") {
    		this.setState({isProdNameValid: true}); 
    	}
    	if (this.props.desc == "") {
    		this.setState({isDescValid: true}); 
    	}
    	if (this.props.discount == "") {
    		this.setState({isDiscountValid: true}); 
    	}
    	if (this.props.remaining == "") {
    		this.setState({isPhotoValid: true}); 
    	}
    	if (this.props.price == "") {
    		this.setState({isPriceValid: true}); 
    	}
    	if (this.props.remaining == "") {
    		this.setState({isQtyValid: true}); 
    	}
    	
    	if ((this.props.email != "") && (this.props.fullName != "") && (this.props.password != "")) {
    		submit_new_photo(this)
    	}
	}

  render() {
    let {file, desc, errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className='marginTop'style={{border: '1px solid gray', borderRadius: '10px'}}>
      <h1 style={{color:'blue', opacity: '0.5'}}>Upload a New Product!!</h1>
        { error_msg }
        <Form.Group controlId="type">
            <Form.Label>Select type of account</Form.Label>
            <Form.Control as="select" onChange={
                (ev) => this.changed({category: ev.target.value})}>
                    <option>Electronics</option>
                    <option>Home Decor</option>
                    <option>Fashion</option>
            </Form.Control>
        </Form.Group>
        <Form noValidate validated={this.state.isProdIdValid}>
        	<Form.Group md="1" controlId="productid">
          	<Form.Label>Product Id</Form.Label>
          	<Form.Control
            	required
            	type="number"
            	rows="3"
            	placeholder="Product ID"
            	onChange={(ev) => this.changed({productId: ev.target.value, ratings: 0})}
          	/>
            <Form.Control.Feedback type="invalid">
            	Please provide a valid product id.
        	</Form.Control.Feedback>
        	</Form.Group>
        </Form>
        <Form noValidate validated={this.state.isProdNameValid}>
        	<Form.Group md="1" controlId="productname">
          	<Form.Label>Product Name</Form.Label>
          	<Form.Control
            	required
            	type="text"
            	rows="3"
            	placeholder="Product Name"
            	onChange={(ev) => this.changed({productName: ev.target.value}) }
          	/>
            <Form.Control.Feedback type="invalid">
            	Please provide a valid product name.
        	</Form.Control.Feedback>
        	</Form.Group>
        </Form>
        <Form noValidate validated={this.state.isDescValid}>
        	<Form.Group md="1" controlId="desc">
          	<Form.Label>Description</Form.Label>
          	<Form.Control
            	required
            	type="textarea"
            	rows="3"
            	placeholder="Description"
            	onChange={(ev) => this.changed({desc: ev.target.value}) }
          	/>
            <Form.Control.Feedback type="invalid">
            	Please provide a valid description.
        	</Form.Control.Feedback>
        	</Form.Group>
        </Form>
        <Form noValidate validated={this.state.isDiscountValid}>
        	<Form.Group md="1" controlId="discount">
          	<Form.Label>Discount</Form.Label>
          	<Form.Control
            	required
            	type="number"
            	placeholder="Discount"
            	onChange={(ev) => this.changed({discount: ev.target.value}) }
          	/>
            <Form.Control.Feedback type="invalid">
            	Please provide a valid discount.
        	</Form.Control.Feedback>
        	</Form.Group>
        </Form>
        <Form noValidate validated={this.state.isPhotoValid}>
        	<Form.Group md="1" controlId="upload">
          	<Form.Label>Upload Photo</Form.Label>
          	<Form.Control
            	required
            	type="file"
            	onChange={(ev) => this.file_changed(ev)} 
            />
          	<Form.Control.Feedback type="invalid">
            	Please provide a valid product photo.
        	</Form.Control.Feedback>
        	</Form.Group>
        </Form>
        <Form noValidate validated={this.state.isPriceValid}>
        	<Form.Group md="1" controlId="price">
          	<Form.Label>Price</Form.Label>
          	<Form.Control
            	required
            	type="number"
            	placeholder="Price"
            	onChange={(ev) => this.changed({price: ev.target.value}) }
          	/>
            <Form.Control.Feedback type="invalid">
            	Please provide a valid price.
        	</Form.Control.Feedback>
        	</Form.Group>
        </Form>
        <Form noValidate validated={this.state.isQtyValid}>
        	<Form.Group md="1" controlId="remaining">
          	<Form.Label>Total Quantity</Form.Label>
          	<Form.Control
            	required
            	type="number"
            	rows="3"
            	placeholder="Quantity"
            	onChange={(ev) => this.changed({remaining: ev.target.value}) }
          	/>
            <Form.Control.Feedback type="invalid">
            	Please provide a valid quantity.
        	</Form.Control.Feedback>
        	</Form.Group>
        </Form>
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => this.submitPressed()}>
            Upload Product</Button>
            <Form.Label>{this.state.message}</Form.Label>
        </Form.Group>
        
      </div>
    );
  }
}

export default connect(state2props)(UploadProduct);
