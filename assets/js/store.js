import { createStore, combineReducers } from 'redux'; 
import deepFreeze from 'deep-freeze-strict';

function sellerslogin(st0 = {email: "", password: "", category: "Sellers", fullName: "", errors: null, newLogin: false}, action) {
    switch(action.type) {
        case 'CHANGE_SELLERS_LOGIN':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function buyerslogin(st0 = {email: "", password: "", category: "Buyers", fullName: "", errors: null, newLogin: false}, action) {
    switch(action.type) {
        case 'CHANGE_BUYERS_LOGIN':
            return Object.assign({}, st0, action.data); 
        default:
            return st0;
    }
}

function signup(st0 = {email: "", password: "", fullName: "", category: "Buyers", errors: null, newLogin: true}, action) {
    switch(action.type) {
        case 'CHANGE_SIGNUP':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function amount(st0 = {money: 0}, action) {
    switch(action.type) {
        case 'CHANGE_AMOUNT':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function new_photo(st0 = {file: null,category: "Electronics", desc: "",discount: 0, price: 0,productId: 0, productName: "", ratings: 0.0, remaining: 0, errors: null}, action) {
    switch (action.type) {
      case 'CHANGE_NEW_PHOTO':
        return Object.assign({}, st0, action.data);
      default:
        return st0;
    }
}

function productDetails (st0 = new Map(), action) {
    switch(action.type) {
        case 'PRODUCT_DETAILS':
            let st1 = new Map(st0);
            for (let product of action.data)
                st1.set("" + product.product_id, product);
            return st1;
        default:
            return st0;    
    }
}
  

function forms(st0, action) {
    let reducer = combineReducers({
        sellerslogin,
        buyerslogin,
        signup,
        amount,
        new_photo,
        productDetails
    });
    return reducer(st0, action);
}

function money(st0 = new Map(), action) {
    switch (action.type) {
      case 'ADD_MONEY':
        let st1 = new Map(st0);
        for (let money of action.data) {
          st1.set(money.id, money);
        }
        return st1;
      default:
        return st0;
    }
}

function photos(st0 = new Map(), action) {
    switch (action.type) {
      case 'ADD_PHOTOS':
        let st1 = new Map(st0);
        for (let photo of action.data) {
          st1.set(photo.id, photo);
        }
        return st1;
      default:
        return st0;
    }
}

let session0 = localStorage.getItem('session');
if (session0) {
    session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
    switch (action.type) {
        case 'LOG_IN':
            return action.data;
        case 'LOG_OUT':
            return null;
        default:
            return st0;
    }
}

function root_reducer(st0, action) {
    console.log(st0);
    let reducer = combineReducers({
        forms,
        money,
        photos,
        session,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;