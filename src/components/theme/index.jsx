import { useContext } from 'react';
import { ThemeContext } from '../../App';
import './style.css'; 

const Theme = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    return (
        <div className="theme">
            <button className="theme-button" style={theme ? {backgroundColor:'white', color:'black'} : null} onClick={()=>setTheme(!theme)} >Theme</button>
        </div>
    )
}

export default Theme; 