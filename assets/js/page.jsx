import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col, NavDropdown } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import { Redirect } from 'react-router';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import store from './store';

import SellersLogin from './logins/sellers';
import BuyersLogin from './logins/buyers';
import SignUp from './signup';
import Profile from './profile/profile';
import ProfileSeller from './profile/profileseller';
import ProductsPage from './products/productspage';
import UploadProduct from './sellerproduct/uploadproduct';
import ProductDetails from './productDetails';
import ProductCheckout from './products/productCheckout';

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md="6">
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
              <i class="fas fa-home" style={{fontSize: '35px'}}/>
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md="6">
          <Session />
        </Col>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <Carousel className="mt-5" style={{height: '500px'}}>
            <div>
                <img src="https://review.chinabrands.com/chinabrands/seo/image/20190219/dubai online shopping sites,.png"/>
                <p className="legend">Deal of the day</p>
            </div>
            <div>
                <img src="https://review.chinabrands.com/chinabrands/seo/image/20190219/dubai online shopping sites.png" />
                <p className="legend">Best deals for money</p>
            </div>
            </Carousel>
        </Route>

        <Route exact path="/logins/sellers">
          <SellersLogin />
        </Route>

        <Route exact path="/logins/buyers">
          <BuyersLogin />
        </Route>

        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/profile/profile">
          <Profile />
        </Route>

        <Route exact path="/profile/profileseller">
          <ProfileSeller />
        </Route>

        <Route exact path="/products">
          <ProductsPage />
        </Route>

        <Route exact path="/upload">
          <UploadProduct />
        </Route>

        <Route path="/productDetails/:id" component={ProductDetails} />        
        <Route exact path="/checkout">
          <ProductCheckout />
        </Route>
      </Switch>
    </Router>
  );
}

let Session = connect(({session}) => ({session}))(({session, dispatch}) => {
  
  if (session) {
    if(session.type == "seller"){
      return(
        <SellerPage session = {session} dispatch = {dispatch}/>
      );
    }else{
      return(
        <BuyerPage session = {session} dispatch = {dispatch}/>
      );
    }
  }
  else {
    return (
      <div>
      <Nav>
        <Nav.Item>
          <NavLink to="/logins/sellers" exact activeClassName="active" className="nav-link">
            Seller's Login
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/logins/buyers" exact activeClassName="active" className="nav-link">
            Buyer's Login
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/signup" exact activeClassName="active" className="nav-link">
            Sign Up
          </NavLink>
        </Nav.Item>
      </Nav>
      <Redirect to={"/"} />
      </div>
    );
  }
});

function SellerPage(props) {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    props.dispatch({
      type: 'LOG_OUT',
    });
  }
  return (
    <div>
      <Nav>
          <NavDropdown title={"Welcome: " + props.session.user_name} id="nav-dropdown">
            <NavDropdown.Item><NavLink to="/profile/profile">My Profile</NavLink></NavDropdown.Item>
            <NavDropdown.Item><NavLink onClick={logout}>Logout</NavLink></NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <NavLink to="/profile/profileseller" exact activeClassName="active" className="nav-link">
              My Profile - Seller
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/upload" exact activeClassName="active" className="nav-link">
              Add New Product
            </NavLink>
          </Nav.Item>
      </Nav>
    </div>
  );
}

function BuyerPage(props) {
  function logout(ev) {
    ev.preventDefault();
    localStorage.removeItem('session');
    props.dispatch({
      type: 'LOG_OUT',
    });

  }
  return (
    <div>
      <Nav>
          <NavDropdown title={"Welcome: " + props.session.user_name} id="nav-dropdown">
            <NavDropdown.Item><NavLink to="/profile/profile">My Profile</NavLink></NavDropdown.Item>
            <NavDropdown.Item><NavLink to="" onClick={logout}>Logout</NavLink></NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <NavLink to="/products" exact activeClassName="active" className="nav-link">
              See Products
            </NavLink>
          </Nav.Item>
          <Nav.Item>
            <NavLink to="/checkout" exact activeClassName="active" className="nav-link">
              Checkout cart
              {/* Add the logo of cart */}
            </NavLink>
          </Nav.Item>
      </Nav>
    </div>
  );
}
