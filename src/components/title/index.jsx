import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './style.css'; 

const Title = () => {
    const {theme} = useContext(ThemeContext)
    return (
        <div className="title" style={theme ? {backgroundColor:'gray'} : null}> 
            <img src="https://www.pngarts.com/files/3/Pizza-PNG-Image.png" alt="logo" className="logo" />
            <h1 id="title">FooDose</h1>
        </div>
    )
}

export default Title; 