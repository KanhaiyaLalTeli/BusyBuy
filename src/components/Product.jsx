import { useContext } from "react";
import { addToCart, firebaseContext } from "../Utils/Context";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Product = ({ product }) => {
  const notify = (msg) => toast.success(msg);
  const { title, image, price } = product;
  const { isLoggedIn, user } = useContext(firebaseContext);
  const nevigate = useNavigate();
  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      nevigate("signin");
    } else {
      const newProduct = {
        title: product.title,
        price: product.price,
        id: product.id,
        image: product.image,
      };
      addToCart(newProduct, user, notify);
    }
  };
  return (
    <div className="productContainer">
      <ToastContainer />
      <div className="imageContainer">
        <img className="image" src={image}></img>
      </div>
      <div className="productName">{title.substring(0, 22)}...</div>
      <div className="productPrice">₹ {price.toFixed(0)}</div>
      <button
        className="addToCartButton"
        onClick={() => handleAddToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  );
};
export default Product;
