import { useState, useEffect, useReducer } from "react";
import Search from "../../components/searchBar";
import Title from "../../components/title";
import Meals from "../../components/mealItems";
import FavMeals from "../../components/favourite"; 
import NoLoad from "../../components/NoFavload";
import './style.css';

// api url: https://www.themealdb.com/api/json/v1/1/search.php?s=${name}
const Homepage = () => {
    // loading 
    const [loading, setLoading] = useState(false);

    // nothing is found, show
    const [ nothing, setNothing ] = useState(false);

    // for storaing the search reasult
    const [searchResult, setSearchResult] = useState([]);

    // for emptying search input
    const [empty, setEmpty] = useState(false);

    // favourite list
    const [favourites, setFavourites] = useState([]);

    // reducer 
    const reducer = (state, action) => {
        switch (action.type) {
            case 'filteredMeal':
                return {
                    ...state,
                    filteredMeal: action.value
                };
            default:
                return state;
        }
        
    };

    // initializer initial state
    const initializer = {
        filteredMeal: ''
    }

    // for feltering the meal from favourite list
    const [filteredMeal , dispatch] = useReducer(reducer, initializer);

    // filter meal
    const filteredFavMeal =  favourites.filter((item) => item.strMeal.toLowerCase().includes(filteredMeal.filteredMeal));

    // loading
    useEffect(() =>{
        const getFavouriteListFromLocalStorage = JSON.parse(localStorage.getItem('items'));
        if(getFavouriteListFromLocalStorage != null){
            setFavourites(getFavouriteListFromLocalStorage); 
        }
    },[]);

    // search meals
    const searchHandle = (input) => {
        async function search (){
            setLoading(true);
            await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
            .then(res => res.json())
            .then((data) => {
                setEmpty(true);
                if(data.meals && data.meals.length > 0){
                    setLoading(false);
                    setSearchResult(data.meals);
                    return searchResult;
                }
                setLoading(false);
                setNothing(true);
                setTimeout(() => {
                    setNothing(false);
                }, 2500);
            })
        }
        search();
    }

    // Add to Favourite list
    const addToFavouriteList = (item) => {
        const items = [...favourites]
        const index = items.findIndex(id => id.idMeal === item.idMeal);
        if(index === -1){
            const element = document.getElementById(item.idMeal);
            const btn = element.lastChild;
            btn.style.backgroundColor = 'red';
            items.push(item); 
            setFavourites(items);
            localStorage.setItem('items',JSON.stringify(items));
        }else{
            alert('Alredy add to Favourite');
        }
    }

    const RemoveFromFavouriteList = (item) => {
        let copyFav = [...favourites];
        const index = copyFav.findIndex(id => id.idMeal === item.idMeal);
        copyFav.splice(index, 1);
        setFavourites(copyFav);
        localStorage.setItem('items',JSON.stringify(copyFav));
    }

    return (
        <div className="homePage">
            <Title/>
            <Search searchHandle={searchHandle} empty={empty} setEmpty={setEmpty}/>
            {/* loading */}
            { loading && <div><h1 className="loading">Searching for meals! Please Wait...</h1></div>}
            {/* when nothig is related t0 input */}
            { nothing && <div><h1 className="loading">No Meals Are Found! Search for other Meals</h1></div>}
            {/* favourites */}
            <hr/>
            <h2 style={{color:'white', margin: '10px 0px 10px 0px'}}>Favourite Meals</h2>
            <input 
                type='text' 
                placeholder="Filter Meals.." 
                className="filter"
                onChange={(event) => dispatch({type:'filteredMeal', value: event.target.value})}
                value={filteredMeal.filteredMeal}
            />
            <div className="favItems"> 
                {(filteredFavMeal.length > 0) ? filteredFavMeal.map((item) => <FavMeals id={item.idMeal} item={item} remove={RemoveFromFavouriteList} />) : <NoLoad/>} 
            </div>
            {/* search meals */}
            <hr/>
            {(searchResult.length > 0) ? <h2 style={{color:'white'}}>Search Meals</h2> : null}
            <div className="mealItems">
                { (searchResult.length > 0) ? searchResult.map((item) => <Meals id={item.idMeal} item={item} fav={addToFavouriteList} />) : null}
            </div>
        </div>
    )
}

export default Homepage;