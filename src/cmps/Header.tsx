import { useEffect, useRef, useState } from "react"
import { FaUserAlt } from "react-icons/fa"
import { IoMdArrowDropdown } from "react-icons/io"
import { FaUserCircle } from "react-icons/fa"
import { MdGroup } from "react-icons/md"
import { BiExit } from "react-icons/bi"
import ThemeToggle from "./ThemeToggle"
import { useAppDispatch } from "../hooks"

function Header() {
    const dispatch = useAppDispatch()
    const dropDownRef = useRef<HTMLDivElement>(null)
    const dropBtnDownRef = useRef<HTMLButtonElement>(null)

    const [isDropdown, setIsDropdown] = useState<boolean>(false)
    useEffect(() => {
        const handleToggleDropdown = ({target}: MouseEvent) => {
            if (target === dropBtnDownRef.current) setIsDropdown(prev => !prev)
            else if (target !== dropDownRef.current && isDropdown) setIsDropdown(false)
        }
        window.addEventListener('click', handleToggleDropdown);
        return () => {
          window.removeEventListener('click', handleToggleDropdown);
        }
      }, [isDropdown])
    // todo get current user's name and image
  return (
    <header className="app-header">
        <ThemeToggle dispatch={dispatch} />
        <button ref={dropBtnDownRef}>
            {/* <div className="user-image"></div> */}
            <div className="placeholder-image" data-theme="call-to-action"><FaUserAlt /></div>
            <p data-theme="headline">Xanthe Neal</p>
            <IoMdArrowDropdown />
            <div ref={dropDownRef} className={`dropdown-menu ${isDropdown ? 'active' : ''}`} data-theme="background">
                <a className="dropdown-link" data-theme="headline" onClick={() => setIsDropdown(false)}><FaUserCircle /> My Profile</a>
                <a className="dropdown-link" data-theme="headline" onClick={() => setIsDropdown(false)}><MdGroup /> Group Chat</a>
                <a className="dropdown-link" data-theme="text error" onClick={() => setIsDropdown(false)}><BiExit /> Logout</a>
            </div>
        </button>
    </header>
    )
}

export default Header