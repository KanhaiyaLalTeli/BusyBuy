import { useState } from "react";
import FirebaseApp ,{FirebaseAuth} from "../Utils/Firebase";
import { createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () =>{
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const notify = () => toast.success("Welcome "+ name,{position: "top-center",});

    const signUpHandle =async () =>{
    if (name && email && password && email.includes('@') && email.length > 4 && password.length > 5) {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
       await updateProfile(userCredential.user, {
        displayName: name,
      });

      notify();
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message); 
      console.error(err.code, err.message);
    }
  } else {
    setError("Please provide valid Email & password");
  }
    }

    return (
        <div className="signInContainer">
           <ToastContainer />
            <div className="signIn">Sign Up</div>
            <input className="name" type="text" placeholder="Enter Name" required
            value={name} onChange={(e)=> setName(e.target.value)}/>
            <input className="email" type="text" placeholder="Enter Email" required 
            value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input className="password" type="text" placeholder="Enter Password" required
            value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button className="signInBtn" onClick={signUpHandle}>Sign Up</button>
           <div className="error">{error}</div>
        </div>
    )
}
export default  SignUp;