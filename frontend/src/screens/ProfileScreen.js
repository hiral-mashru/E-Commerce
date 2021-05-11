import React, {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {updateProfile} from '../Actions'

function ProfileScreen(props){

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const userSignin = useSelector(state=>state.userSignin)
    const {userInfo} = userSignin 

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProfile({ userId: userInfo._id, email, name, password }))
    }
    const updatedProfile = useSelector(state=> state.updatedProfile)
    const { loading, success, error } = updatedProfile

    useEffect(() => {
        if (userInfo) {
          console.log(userInfo.name)
          setEmail(userInfo.email);
          setName(userInfo.name);
          setPassword(userInfo.password);
        }
        // dispatch(listMyOrders());
        return () => {
    
        };
      }, [userInfo])

    return(<div>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h3>Profile</h3>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {success && <div>Profile Saved Successfully.</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" value={name} id="name" onChange={(e)=>setName(e.target.value)} /> 
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" value={email} id="email" onChange={(e)=>setEmail(e.target.value)} /> 
                    </li>
                    <li>
                        <label htmlFor="password"> Password </label>
                        <input type="password" name="password" value={password} id="password" onChange={(e)=>setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">Update</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>)
}

export default ProfileScreen