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

function forms(st0, action) {
    let reducer = combineReducers({
        sellerslogin,
        buyerslogin,
        signup
    });
    return reducer(st0, action);
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
    let reducer = combineReducers({
        forms,
        session,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;