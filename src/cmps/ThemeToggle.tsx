import { AnyAction, Dispatch } from "@reduxjs/toolkit"
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs"
import { useAppSelector } from "../hooks"
import { setTheme } from "../store/slices/styleSlice"

type ThemeToggleProps = {
  dispatch: Dispatch<AnyAction>
}

function ThemeToggle(props: ThemeToggleProps) {
  const currTheme = useAppSelector(state => state.style.theme)
  const { dispatch } = props
  
  function toggleTheme(){
    dispatch(currTheme === 'light' ? setTheme('dark') : setTheme('light'))
  }
  return  <button className="theme-toggle" data-theme="theme-toggle" onClick={toggleTheme}>{currTheme === 'light' ? <BsSunFill data-theme="svg" /> : <BsMoonStarsFill data-theme="svg" />}</button>
    
}

export default ThemeToggle