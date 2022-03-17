import { useContext } from 'react'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { ThemeContext } from '../../contexts/ThemeContext'


export const ThemeToggler = () => {
    const { toggleTheme, isDarkMode } = useContext(ThemeContext);
  return (
    <div className='h-screen fixed top-0 right-0 z-10 flex flex-col items-end justify-end'>
        <button 
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme} 
            className={`rounded-full text-lg filter transition-all drop-shadow-xl hover:scale-110 p-2.5 mb-6 mr-2 ${isDarkMode ? 'bg-light text-dark' : 'bg-dark text-light'}`}>
            {!isDarkMode ? <BsFillSunFill /> : <BsMoonStarsFill />}
        </button>
    </div>
  )
}
