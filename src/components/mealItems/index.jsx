import './style.css';

const Meals = (props) => {
    const { id,item,fav } = props;

    return (
        <div id={id} className="card" key={id}>
            <div className="card-image"><img src={item.strMealThumb} alt="item"/></div>
            <div className="head">Meal : {item.strMeal}</div>
            <div className="head">Origin : {item.strArea} </div>
            <button className='fav-btn' onClick={()=>fav(item)}>Add To Favourite</button>
        </div>
    )
}

export default Meals;