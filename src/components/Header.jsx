import { Link, useNavigate } from "react-router";
import { FirebaseAuth } from "../Utils/Firebase";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseContext } from "../Utils/Context";

const Header= () =>{

    const data= useContext(firebaseContext);
    const nevigate= useNavigate();

     const handleLogOut = async() =>{
        try{
            await signOut(FirebaseAuth);
            console.log("User signed out successfully");
            data.setUser('');
            nevigate("/");
        }
        catch(error){
            console.log(error)
        }

     }
    return (
        <div className="headerContainer">
            <div className="heading">
                <Link to='/' className="heading">Busy Buy</Link>              
            </div>
            <div className="headerMenu">               
                    <Link to='/' className="heading">Home</Link>  
                    {data.isLoggedIn && (<div> <Link to="/myorders"  className="heading myoder">My orders</Link>
                                    <Link to="/cart"  className="heading cart">Cart</Link>
                              </div>)}
                 {data.isLoggedIn ? <div className="heading" onClick={handleLogOut}>Logout</div> :  
                 <Link to='/signin' className="heading">SignIn</Link>}
                
            </div>
            
        </div>
    )
}
export default Header;