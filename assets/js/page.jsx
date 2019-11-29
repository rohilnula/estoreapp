import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';

import store from './store';

import SellersLogin from './logins/sellers';
import BuyersLogin from './logins/buyers';
import SignUp from './signup';
import Profile from './profile/profile';
import ProductsPage from './products/productspage';
import UploadProduct from './sellerproduct/uploadproduct';
<<<<<<< Updated upstream
import ProductDetails from './productDetails';
=======
import Reviews from './reviews/reviews';
>>>>>>> Stashed changes

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
        <Col md="8">
          <Nav>
            <Nav.Item>
              <NavLink to="/" exact activeClassName="active" className="nav-link">
                Welcome to E-Store
              </NavLink>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md="4">
          <Session />
        </Col>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <h1>One Stop Purchase Website!!!!!!!!!!!!!!!!!! We are Happy You are here.</h1>
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

        <Route exact path="/products">
          <ProductsPage />
        </Route>

        <Route exact path="/upload">
          <UploadProduct />
        </Route>

        <Route path="/productDetails/:id" component={ProductDetails} />        

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
    <Nav>
        <Nav.Item>
          <p className="text-light py-2">User: {props.session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/profile/profile" exact activeClassName="active" className="nav-link">
            My Profile
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/upload" exact activeClassName="active" className="nav-link">
            Add New Product
          </NavLink>
        </Nav.Item>
    </Nav>
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
    <Nav>
        <Nav.Item>
          <p className="text-light py-2">User: {props.session.user_name}</p>
        </Nav.Item>
        <Nav.Item>
          <a className="nav-link" href="#" onClick={logout}>Logout</a>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/profile/profile" exact activeClassName="active" className="nav-link">
            My Profile
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/products" exact activeClassName="active" className="nav-link">
            See Products
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to="/reviewspage" exact activeClassName="active" className="nav-link">
            Reviews
          </NavLink>
        </Nav.Item>
    </Nav>
  );
}