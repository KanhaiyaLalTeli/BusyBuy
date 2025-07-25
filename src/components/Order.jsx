const Order = ({order,time}) =>{
   
    let totalPrice=order.reduce((acc,curr) =>  acc+(curr.price.toFixed(0) * curr.quantity),0);
    return !order ? <Spinner radius={120} color={"#333"} stroke={2} visible={true} className="spinner"/> : (
        <div className="orderContainer">
            <div className="orderTime">Ordered On:- {time.toDate().toLocaleString()}</div>
            <table className="orderTable" >
                <thead>
                <tr>
                 <th className="orderh1">Title</th>
                 <th className="orderh2">Price</th>
                 <th className="orderh2">Quantity</th>
                 <th className="orderh2">Total Price</th>
                </tr>
                </thead>
          <tbody>
        {order.map((items) =>
               
                <tr key={items.id}>
                    <td>{items.title}</td>
                    <td>{items.price}</td>
                    <td>{items.quantity}</td>
                    <td>{items.price * items.quantity}</td>
                    
                </tr>,
                
        )}
        <tr>
            <td colSpan={3}></td>
            <td>{totalPrice}</td>
        </tr>
        </tbody>
         </table>

        </div>
    )
}
export default Order;