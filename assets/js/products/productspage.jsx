import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Label,Button, Alert, Grid, Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Product from './product';
// import store from '../store';

 import { get_all_products} from '../ajax';

class ProductsPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            redirect: null,
            category: "",
            price: 0.0,
            imageSrc: "",
            productName: "",
            products: [],
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
            length: 10,
        });
    }

    componentDidMount(){
        var resp =  get_all_products().then((resp) => {
        var dataDisplay = resp.data;
      
        console.log(resp);
/*         var data = resp.data.filter((f) => {
            if (f.id == this.state.userID){
                return f;
            }
        }) */
       // console.log(data);
        this.setState({products: resp.data});
        //console.log("response" + resp);
    })}

    render() {
        if(this.state.products.length == 0){
            var loadingDiv = [];
                loadingDiv.push(<div><h1>Please wait, Products Loading ..</h1></div>);
              return loadingDiv;
        }
        var local = [];
        var getItem = [];
        for(let i =0; i < this.state.products.length; i++){
            let dataReceived = this.state.products[i];
            console.log("inside make products " + JSON.stringify(dataReceived))
            console.log(dataReceived.id);
          getItem.push(<Col style={{ padding:20}} key = {dataReceived.id}><Product key = {dataReceived.id} productName = {dataReceived.product_name} price = {dataReceived.price}  imageSource ={dataReceived.photo}/></Col>);
        }
        return (
            <div>
                <Row>
              {getItem}
              </Row>
            </div>
        );
    }
}

function MakeProducts(params){
  var length = params.length
  if(params.products.length == 0){
      var loadingDiv = [];
      loadingDiv.push(<div><h1>Please wait, Products Loading ..</h1></div>);
    return loadingDiv;
  }

 /*  var getItem = [];
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
  } */

  console.log({getItem});
  return local.push(<Row>{getItem}</Row>);

}

export default ProductsPage;