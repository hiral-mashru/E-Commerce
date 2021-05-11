import Axios from 'axios'
import Cookie from "js-cookie"
import { CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_ADD_ITEM, CART_REMOVE_ITEM, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT_FAIL, USER_SIGNOUT_REQUEST, USER_SIGNOUT_SUCCESS, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, ORDER_DELETE_FAIL, ORDER_DELETE_SUCCESS, ORDER_DELETE_REQUEST, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_PAY_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_SUCCESS, ORDER_LIST_REQUEST, MY_ORDER_LIST_FAIL, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_CREATE_REQUEST, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL } from './Constants';
// const { default: Axios } = require("axios")
import axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_DELETE_FAIL, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL,PRODUCT_SAVE_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from "./Constants";

const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get( // '/api/products');
      '/api/products?category=' +category +'&searchKeyword=' +searchKeyword +'&sortOrder=' +sortOrder);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch,getState) => {
    try {
        dispatch({type: PRODUCT_SAVE_REQUEST, payload: product})
        const {userSignin: {userInfo}} = getState()
        if (!product._id) {
            const { data } = await Axios.post('/api/products', product, {
              headers: {
                Authorization: 'Bearer ' + userInfo.token,
              },
            });
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
          } else {
            const { data } = await Axios.put('/api/products/' + product._id,product,
              {
                headers: {
                  Authorization: 'Bearer ' + userInfo.token,
                },
              }
            );
            dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
      } catch (error) {
        dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
      }
    };

const deleteProduct = (productId) =>async (dispatch,getState) => {
    try {
        const {userSignin: {userInfo}} = getState()
        dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId});
        const {data} = await Axios.delete('/api/products/'+productId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            },
        });
        dispatch({type: PRODUCT_DELETE_SUCCESS, payload: data, success: true})
    } catch(error) {
        dispatch({type: PRODUCT_DELETE_FAIL, payload: error.message});
    }
}

const detailsProduct = (productId) =>async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId});
        const {data} = await Axios.get('/api/products/'+productId);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch(error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}

const addToCart = (productId,qty) => async (dispatch,getState) => {
    try {
        const {data} = await Axios.get("/api/products/"+productId);
        console.log("data",data)
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }});
        const {cart:{cartItems}} = getState()
        Cookie.set("cartItems",JSON.stringify(cartItems))
    } catch(error){

    }
}

const removeFromCart =(productId) => (dispatch,getState) =>{
    dispatch({type: CART_REMOVE_ITEM, payload: productId})
    const {cart:{cartItems}} = getState()
    Cookie.set("cartItems",JSON.stringify(cartItems))
}

const signin = (email,password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email,password}})
    try {
        const {data} = await Axios.post('/api/users/signin', {email,password})
        console.log("dataa",data)
        dispatch({type: USER_SIGNIN_SUCCESS,payload: data})
        Cookie.set('userInfo',JSON.stringify(data))
    } catch(error){
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message })
    }
}

const signout = () => (dispatch) => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
  }

const register = (name,email,password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name,email,password}})
    try {
        const {data} = await Axios.post('/api/users/register', {name,email,password})
        dispatch({type: USER_REGISTER_SUCCESS,payload: data})
        Cookie.set('userInfo',JSON.stringify(data))
    } catch(error){
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message })
    }
}

const updateProfile = ({ userId, name, email, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
    try {
      const { data } = await Axios.put("/api/users/" + userId,
        { name, email, password }, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
  }

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data})
}

const savePayment = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data})
}

const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
      const { userSignin: { userInfo } } = getState();
      const { data: { data: newOrder } } = await Axios.post("/api/orders", order, {
        headers: {
          Authorization: ' Bearer ' + userInfo.token
        }
      });
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
  }
  
  const listMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_ORDER_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders/mine", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
    }
  }
  
  const listOrders = () => async (dispatch, getState) => {
  
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders", {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    }
  }
  
  const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.get("/api/orders/" + orderId, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
    }
  }
  
  const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
    }
  }
  
  const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.delete("/api/orders/" + orderId, {
        headers:
          { Authorization: 'Bearer ' + userInfo.token }
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
    }
  }

  const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
    }
  };

export {saveProductReview, createOrder, detailsOrder, payOrder, listMyOrders, listOrders, deleteOrder,addToCart,listProducts, detailsProduct, removeFromCart, signin, register, saveProduct, deleteProduct, signout, saveShipping, savePayment, updateProfile}