import { useEffect, useState } from "react";

const Filter= (props) =>{

     const {setFilteredList,productList} = props;

    const [range, setRange] = useState(5000);
    const [checkedItems, setCheckedItems] =useState({
        "men's clothing" : false,
        "women's clothing" : false,
        "jewelery" : false,
        "electronics" : false
    })

    const handleRange = (e) =>{
        const input=e.target.value;
        setRange(input);
        const newList= productList.filter((product) => product.price*100 >= input);
        setFilteredList(newList);
       
    }

    const handleCheckBox = (e) =>{
        const {name, checked} =e.target;
        setCheckedItems((prev)=> ({
            ...prev,
            [name] : checked,
        }));
       
    };

    useEffect(()=>{
    const isAnyChecked = Object.values(checkedItems).some(Boolean);

    if (isAnyChecked) {
      const checkList = productList.filter(
        (product) => checkedItems[product.category]
      );
      setFilteredList(checkList);
    } else {
      setFilteredList(productList);
    }

    },[checkedItems])

    return (
    <div className="filterContainer">
                <h1>Filter</h1>
                <div>Price : {range}</div>
                <div>
                    <input type="range" min="1" max="99999" value={range} 
                    onChange={(e) =>handleRange(e)}></input>
                </div>
                <div>Category</div>
                <div className="categoriesContainer">
                    <label>
                        <input type="checkBox" name="men's clothing" checked={checkedItems["men's clothing"]}
                        onChange={handleCheckBox}/>
                         Men's Clothing
                    </label>
                    <label>
                        <input type="checkBox" name="women's clothing" checked={checkedItems["women's clothing"]}
                        onChange={handleCheckBox}/>
                         Women's Clothing
                    </label>
                    <label>
                        <input type="checkBox" name="jewelery" checked={checkedItems["jewelery"]}
                        onChange={handleCheckBox}/>
                         Jewelery
                    </label>
                    <label><input type="checkBox" name="electronics" checked={checkedItems["electronics"]}
                        onChange={handleCheckBox}/>
                         Electronics
                    </label>
                </div>
            </div>
    )
}
export default Filter;