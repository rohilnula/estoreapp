import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Label,Button, Alert, Grid, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Product from './product';
// import store from '../store';

// import { get_all_buyers, add_Money } from '../ajax';

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
            length: 10,
        });
    }

    render() {
        return (
            <div>
            <h1>TESTER!!!!!!!!!!!!!!!!!</h1>
            <MakeProducts length={10}/>
            </div>
        );
    }
}

function MakeProducts(params){
  var length = params.length
  var local = [];
  var getItem = [];
  if (length % 3 != 0){
    length = length + (3 - (length % 3));
  }
  for(let i =0; i <= length; i++){
    if(i % 3 == 0 && i != 0){
        local.push(<Row>{getItem}</Row>);
        getItem = [];
        getItem.push(<Col><Product /></Col>)
    }else{
        getItem.push(<Col><Product /></Col>)
    }
  }

  return local;

}

export default ProductsPage;