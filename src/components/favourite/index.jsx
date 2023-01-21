import './style.css';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

const FavMeals = (props) => {
    const { id,item,remove } = props;
    const {theme} = useContext(ThemeContext);

    return (
        <div key={id} id={id} className="fav-card" style={theme ? {backgroundColor:'red'}: null}>
            <div className="fav-card-image"><img src={item.strMealThumb} alt="item"/></div>
            <div className="fav-head">Meal : {item.strMeal}</div>
            <div className="fav-head">Origin : {item.strArea} </div>
            <button className='fav-btn' onClick={()=>remove(item)}>Remove From Favourite</button>
        </div>
    )
}

export default FavMeals;