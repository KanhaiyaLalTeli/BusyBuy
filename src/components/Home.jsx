import { useEffect, useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import Product from "./Product";
import { GridLoader } from "react-spinners";

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading,setLoading] =useState(false);

  const getProductdata = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const json = await data.json();
    setProductList(json);
    setFilteredList(json);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getProductdata();
  }, []);

  


  return loading ? (
     <GridLoader color="#0381e8" size={20} className="loader"/>
  ) : (
    <>
      <Search setFilteredList={setFilteredList} productList={productList} />
      <div className="mainContainer">
        <Filter
          setFilteredList={setFilteredList}
          filteredList={filteredList}
          productList={productList}
        />
        <div className="productsContainer">
          {filteredList.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
