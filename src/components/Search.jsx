import { useState } from "react";

const Search = (props) =>{
    const {setFilteredList,productList} = props;

    const [search,setSearch] = useState("");

    const handleSearch = (e) =>{
        const input=e.target.value;
        setSearch(input);
        const newList= productList.filter((product) => 
        product.title.toLowerCase().includes(input.toLowerCase()));
        setFilteredList(newList); 
    } 

    return(
        <>
        <div className="searchContainer">
            <input type="text" placeholder="Search By Name" className="searchBox"
           value={search} onChange={(e)=>handleSearch(e)}></input>
        </div>
        </>
    )
}
export default Search;