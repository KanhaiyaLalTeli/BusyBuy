import { useContext, useEffect, useState } from "react";
import { firebaseContext } from "../Utils/Context";
import { getOrders } from "../Utils/Context";
import Order from "./Order";
import { GridLoader } from "react-spinners";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] =useState(false);
  const { user } = useContext(firebaseContext);

  const getOrdersDetails = async () => {
    const order = await getOrders(user);
    setOrders(order);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getOrdersDetails();
    
  }, []);
  return loading ? (
     <GridLoader color="#0381e8" size={20} className="loader"/>
  ) : (
    <>
      <h1 className="orderheading">Orders List</h1>
      <div>
        {orders.map((order) => (
          <Order
            key={order.createdAt.seconds}
            order={order.items}
            time={order.createdAt}
          />
        ))}
      </div>
    </>
  );
};
export default MyOrders;
