import { useContext, useEffect, useState } from "react";
import {
  firebaseContext,
  getCartData,
  removeFromCart,
  increaseQuntity,
  addToCart,
  decreaseQuantity,
  purchase,
} from "../Utils/Context";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { GridLoader } from "react-spinners";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading,setLoading] =useState(false);

  const { user } = useContext(firebaseContext);
  const nevigate = useNavigate();
  const notify = () => toast.success("Product Removed Successfully!");

  const cartData = async () => {
    const cartItems = await getCartData(user);
    setCart(cartItems);
    const tPrice = cartItems.reduce((acc, curr) => {
      return acc + curr.price.toFixed(0) * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    cartData();
  }, [addToCart]);

  const handleRemoveFromCart = async (id, user) => {
    await removeFromCart(id, user);
    notify();
    cartData();
  };

  const handleDecreaseQuantity = async (id, user) => {
    await decreaseQuantity(id, user);
    cartData();
  };

  const handleInceaseQuantity = async (id, user) => {
    await increaseQuntity(id, user);
    cartData();
  };

  const handlePurchase = async () => {
    await purchase(user);
    cartData();
    nevigate("/myorders");
  };

  return loading ? <GridLoader color="#0381e8" size={20} className="loader"/> :  cart.length == 0 ? (
    <h1 className="spinner">Cart is Empty</h1>
  ) : (
    <>
      {/* <h1>Cart Items</h1> */}
      <div className="CartMainContainer">
        <ToastContainer />
        <div className="filterContainer">
          <div className="totalPrice">TotalPrice : {totalPrice}</div>
          <button className="addToCartButton" onClick={() => handlePurchase()}>
            Purchase
          </button>
        </div>
        <div className="productsContainer">
          {cart.map((item) => (
            <div key={item.id} className="productContainer">
              <div className="imageContainer">
                <img className="image" src={item.image}></img>
              </div>
              <div className="productName">
                {item.title.substring(0, 22)}...
              </div>
              <div className="pricecontainer">
                <div className="productPrice">₹ {item.price.toFixed(0)}</div>
                <div className="itemQuantityContainer">
                  <button onClick={() => handleDecreaseQuantity(item.id, user)}>
                    -
                  </button>
                  {item.quantity}
                  <button onClick={() => handleInceaseQuantity(item.id, user)}>
                    +
                  </button>
                </div>
              </div>
              <button
                className="removeFromCartBtn"
                onClick={() => handleRemoveFromCart(item.id, user)}
              >
                Remove From Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Cart;
