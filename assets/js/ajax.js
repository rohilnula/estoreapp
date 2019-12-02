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
                form.redirect('/profile/profileseller');
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
                form.redirect('/profile/profile');
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

export function get_all_sellers(){
    var resp =  get('/sellers').then((resp)=>{
        return resp;
      } );
    
    return resp.then((r) => r)                                                                                                                                                                                                                                        
}

export function get_all_purchases(){
    var resp =  get('/purchases').then((resp)=>{
        return resp;
      } );
    
      return resp.then((r) => r)                                                                                                                                                                                                                                        
}

export function get_all_products(){
    var resp =  get('/products').then((resp)=>{
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
        classObject.setState({money: resp.data.money});
    });
        
}

export function submit_new_photo(form) {
    let state = store.getState();
    console.log("state", state);
    let data = state.forms.new_photo;
    console.log("started");
    console.log(data.productName);
    console.log(data.category);
    console.log(data.file.name);
    console.log("done");
    if (data.file == null) {
      return;
    }
  
    let reader = new FileReader();
    let userid = state.session.user_id;
    console.log("Userrrrrrrrrrrr" + userid)
    reader.addEventListener("load", () => {
        console.log("inside post request");
      post('/products', {
        product: {
          description: data.desc,
          category_name: data.category,
          //filename: data.file.name,
          photo: reader.result,
          discount: data.discount,
          price: data.price,
          product_id: data.productId,
          product_name: data.productName,
          ratings: data.ratings,
          remaining: data.remaining,
          seller_id: userid
        }
      }).then((resp) => {
          console.log("success");
        console.log(resp);
        if (resp.data) {
          store.dispatch({
            type: 'ADD_PHOTOS',
            data: [resp.data],
          });
          form.set_message('Product uploaded Successfully');
         // form.redirect('/photos/' + resp.data.id);
        }
        else {
          store.dispatch({
            type: 'CHANGE_NEW_PHOTO',
            data: {errors: JSON.stringify(resp.errors)},
          });
        }
      });
    });
  
    reader.readAsDataURL(data.file);
}

export function add_Review(text, form, product_id){
   
    let state = store.getState();
    let user_name = state.session.user_name;
    console.log(user_name);
    console.log(product_id);
    post('/reviews', {
        review:{
            user: user_name,
            review: text,
            product_id: product_id
        }
    }).then((resp) => {
            console.log("ajax");
            console.log(resp.data);
            store.dispatch({
                type: 'USER_REVIEW',
                data: resp.data,
              });
            // form.state.reviews.push(resp.data);
            // console.log(form.state.reviews);
            // form.setState({reviews: form.state.reviews});
        });

/*     form.state.reviews.push({name: 'Charlie', review: text});
    console.log("ajax");
    console.log(form.state.reviews);
    form.setState({reviews: form.state.reviews}); */
}

export function get_all_reviews(){
    var resp =  get('/reviews').then((resp)=>{
        store.dispatch({
            type: 'USER_REVIEWS',
            data: resp.data,
          });
      } );
    
      return resp.then((r) => r)                                                                                                                                                                                                                                        
}

export function add_to_cart(form, product_id, item_qty) {
	let state = store.getState();
    let user_name = state.session.user_name;
    console.log(form);
    console.log(store);
    post('/carts', {
        cart:{
            user: user_name,
            quantity: item_qty,
            product_id: product_id
        }
    }).then((resp) => {
        console.log("ajax");
        console.log(resp.data);
        form.setState({cart: resp.data});
        store.dispatch({
            type: 'USER_CART',
            data: resp.data,
        });
    });
}

export function placeOrder(form, total) {
    let state = store.getState();
    let data = state.forms.cartItemBrief;
    let user_name = state.session.user_name;
    let userid = state.session.user_id;
    let promiseArr = [];

    for (let item of data) {
        console.log(item);
        promiseArr.push(post('/purchases', {
            purchase: item[1],
            userName: user_name,
            sum: total,
            userId: userid
        }))
    }
    
    Promise.all(promiseArr).then((resp) => {
        store.dispatch({
            type: 'CLEAR_CART_ITEMS'
        });
        
        form.redirect("/products");
    });
}

export function get_all_cart_items() {
    let state = store.getState();
    get('/carts').then((resp) => {
        let itemList = [];
        var actualResp = resp;
        let cartItemList = [];

        get_all_products().then(resp => {
            for (let cartItem of resp.data)
                for (let respItems of actualResp.data)
                    if (respItems.product_id == cartItem.id) {
                        itemList.push(cartItem);
                        respItems.cart_id = respItems.id;
                        cartItemList.push(respItems);
                    }
            
            store.dispatch({
                type: 'USER_CART_DETAILS',
                data: itemList
            });
            
            store.dispatch({
                type: 'CART_ITEMS',
                data: cartItemList
            });
        });
    });
}