import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUP";
import MyOrders from "./components/MyOrders";
import Cart from "./components/Cart";
import { firebaseContext } from "./Utils/Context";
import { AuthLogic } from "./Utils/Context";


const App = () =>{
     const [user , setUser] = useState('');
     const isLoggedIn = user ? true : false;
    return(
        <>
        <BrowserRouter >
        <firebaseContext.Provider value={{isLoggedIn : isLoggedIn, user:user , setUser : setUser}}>
            <AuthLogic/>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/myorders" element={<MyOrders/>}/>
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </firebaseContext.Provider>
        </BrowserRouter>
        </>
    )
}

export default App;