import { Link, useNavigate } from "react-router";
import { FirebaseAuth } from "../Utils/Firebase";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () =>{
     const notify = () => toast.error("Please Enter Valid Data!");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () =>{
        setError('');
        try{
           await signInWithEmailAndPassword(FirebaseAuth,email,password)
        }
        catch(error){
            console.log(error.message);
            notify();
        }
        
    }

    return (
        <div className="signInContainer">
             <ToastContainer />
            <div className="signIn">Sign In</div>
           <input className="email" type="text" placeholder="Enter Email" required 
            value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input className="password" type="text" placeholder="Enter Password" required
            value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button className="signInBtn" onClick={handleSignIn}>Sign In</button>
            <Link className="SignUpLink" to='/signup'>Or SignUp instead</Link>    
            <div className="error">{error}</div>       
        </div>
    )
}
export default  SignIn;