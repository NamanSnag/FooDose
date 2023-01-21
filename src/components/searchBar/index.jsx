import { useEffect, useState } from 'react';
import './style.css';

const Search = (props) => {
    // props 
    const { searchHandle, empty, setEmpty  } = props;

    const [input, setInput] = useState('');

    // handaling input and setting to state
    const handleInput = (event) => {
        event.preventDefault();
        setInput(event.target.value);
    };

    useEffect(()=>{
        if(empty === true){
            setInput('');
            setEmpty(false);
        }
    },[empty, setEmpty, setInput])

    // handleSearch 
    const handleSearch = (event) => {
        event.preventDefault();
        searchHandle(input);
    };

    return (
        <form onSubmit={handleSearch} className="Search">
            <div>
                <input type="search" onChange={handleInput} value={input} placeholder="Search Meals..." id='search-input'/>
                <button type="submit" id='search-btn'><i className="fa fa-neuter"></i></button>
            </div>
        </form>
    ) 
}

export default Search;   