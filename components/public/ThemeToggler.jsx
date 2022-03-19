import { useContext } from 'react'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { ThemeContext } from '../../contexts/ThemeContext'


export const ThemeToggler = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);
  return (
    <div className='fixed top-4 left-2 z-20 flex flex-col items-end justify-end'>
        <button 
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme} 
            className={`rounded-full filter transition-all drop-shadow-xl hover:scale-110 p-2 hover:text-primary border border-transparent hover:border-current border-dashed ${isDarkMode ? 'text-light' : 'text-dark'}`}>
            {!isDarkMode ? <BsFillSunFill /> : <BsMoonStarsFill />}
        </button>
    </div>
  )
}
