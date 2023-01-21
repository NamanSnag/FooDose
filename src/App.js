import { useState, createContext } from "react";
import './App.css';
import Homepage from './pages/homePage';
import Theme from './components/theme';

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);
  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }} >
      <div className="App">
        <Theme/>
        <Homepage/>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
