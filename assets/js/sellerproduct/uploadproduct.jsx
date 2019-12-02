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
        <Form.Group controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows="3"
                        onChange={(ev) => this.changed({desc: ev.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control type="number"
                        onChange={(ev) => this.changed({discount: ev.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="upload">
          <Form.Label>Upload Photo</Form.Label>
          <Form.Control type="file" onChange={(ev) => this.file_changed(ev)} />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" 
                        onChange={(ev) => this.changed({price: ev.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="productid">
          <Form.Label>Product Id</Form.Label>
          <Form.Control type="number" rows="3"
                        onChange={(ev) => this.changed({productId: ev.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="productname">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" rows="3"
                        onChange={(ev) => this.changed({productName: ev.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="rating">
          <Form.Label>Ratings</Form.Label>
          <Form.Control type="number" 
                        onChange={(ev) => this.changed({ratings: ev.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="remaining">
          <Form.Label>Total Quantity</Form.Label>
          <Form.Control type="number" 
                        onChange={(ev) => this.changed({remaining: ev.target.value}) }/>
        </Form.Group>
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => submit_new_photo(this)}>
            Upload Product</Button>
            <Form.Label>{this.state.message}</Form.Label>
        </Form.Group>
        
      </div>
    );
  }
}

export default connect(state2props)(UploadProduct);