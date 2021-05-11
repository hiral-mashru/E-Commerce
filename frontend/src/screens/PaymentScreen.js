import React, { useState} from 'react';
import {useDispatch} from 'react-redux';
import { savePayment } from '../Actions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props){

    const dispatch = useDispatch();

    const [paymentMethod,setPaymentMethod] = useState('')
        
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePayment({paymentMethod}))
        props.history.push('placeorder')
    }
    return (
    <div>
    <div>
    <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
            <form  onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Payment</h2>
                    </li>
                   
                    <li>
                        <input type="radio" name="paymentMethod" value="paypal" id="paymentMethod" onChange={(e)=> setPaymentMethod(e.target.value)} /> {' '}
                        <label htmlFor="paymentMethod" id="left">
                            Paypal
                        </label>
                    </li>
                    <li>
                        <button type="submit" className="button primary">Continue</button>
                    </li>
                    
                </ul>
            </form>
        </div>
    </div>
    </div>);
} 

export default PaymentScreen;