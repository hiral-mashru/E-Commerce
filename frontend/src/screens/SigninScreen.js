import React, {useEffect, useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from'react-router-dom';
import { signin } from '../Actions';

function SigninScreen(props){

    const userSignin = useSelector(state=> state.userSignin)
    const {loading, userInfo, error} = userSignin
    const dispatch = useDispatch();

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const redirect = props.location.search ? props.location.search.split("=")[1]:'/';
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect)
            // console.log("Done")
        }
        return () => {
            //
        }
    }, [userInfo])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password))
    }
    return (
    <div>
        <div className="form">
            <form  onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>SignIn</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} required/> 
                    </li>
                    <li>
                        <label htmlFor="password"> Password </label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} required/>
                    </li>
                    <li>
                        <button type="submit" className="button primary">SignIn</button>
                    </li>
                    <li>
                        New ?
                    </li>
                    <li>
                        <Link to={redirect === "/" ? "register" : "register?redirect="+redirect} className="button secondary text-center">Create your account</Link>
                    </li>
                </ul>
            </form>
        </div>
    </div>);
} 

export default SigninScreen;