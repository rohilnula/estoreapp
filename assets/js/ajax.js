import store from './store';
import React from "react";
import socket from "./socket"

export function post(path, body) {
    let state = store.getState();
    let token = state.session ? state.session.token || "" : "";

    return fetch('/ajax' + path, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function put(path, body) {
    let state = store.getState();
    let token = state.session ? state.session.token || "" : "";

    return fetch('/ajax' + path, {
        method: 'put',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function get(path) {
    let state = store.getState();
    let token = state.session.token || "";
    let current_user = state.session ? state.session.user_id || null : null;

    return fetch('/ajax' + path, {
        method: 'get',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        assigns: {current_user: "current_user"}
    }).then((resp) => resp.json());
}

export function submit_sellers_login(form) {
    let state = store.getState();
    let data = state.forms.sellerslogin;
    post('/sessions', data)
        .then((resp) => {
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/');
            }
            else {
                store.dispatch({
                    type: 'CHANGE_SELLERS_LOGIN',
                    data: {errors: JSON.stringify(resp.errors)},
                });
            }
        });
}

export function submit_buyers_login(form) {
    let state = store.getState();
    let data = state.forms.buyerslogin;
    post('/sessions', data)
        .then((resp) => {
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/');
            }
            else {
                store.dispatch({
                    type: 'CHANGE_BUYERS_LOGIN',
                    data: {errors: JSON.stringify(resp.errors)},
                });
            }
        });
}

export function submit_signup_form(form) {
    let state = store.getState();
    let data = state.forms.signup;
    post('/sessions', data)
        .then((resp) => {
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/');
            }
            else {
                store.dispatch({
                    type: 'CHANGE_SIGNUP',
                    data: {errors: JSON.stringify(resp.errors)},
                });
            }
        });
}

export function get_all_buyers(){
    var resp =  get('/buyers').then((resp)=>{
        return resp;
      } );
    
      return resp.then((r) => r)                                                                                                                                                                                                                                        
}

export function add_Money(form,classObject, currentMoney) {
    let state = store.getState();
    let data = state.forms.buyerslogin;
    let userid = state.session.user_id;
    put('/buyers/' + userid, {
        buyer: {
            id: userid,
            money: +form + +currentMoney,
            email: state.forms.buyerslogin.email,

        }
    }).then((resp) => {
        console.log("success");
        console.log(resp.data.money);
        classObject.setState({money: resp.data.money});
    });
        
}