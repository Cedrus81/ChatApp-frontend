import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdMail, IoMdLock } from "react-icons/io";
import {  faGithub, faGoogle, faTwitter, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { signin } from "../store/slices/userSlice";

import ThemeToggle from "../cmps/ThemeToggle";

function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const strategies = {
    google:{ 
      handler: () => console.log('use google'),
      icon: <FontAwesomeIcon icon={faGoogle} />
    },
    facebook: {
      handler: () => console.log('use facebook'),
      icon: <FontAwesomeIcon icon={faSquareFacebook} />
    },
    tweeter: {
      handler: () => console.log('use tweeter'),
      icon: <FontAwesomeIcon icon={faTwitter} />
    },
    github: {
      handler: () => console.log('use github'),
      icon: <FontAwesomeIcon icon={faGithub} />
    },
  }
  function onLogin(ev: FormEvent<HTMLFormElement>){
      ev.preventDefault()
      if(!emailRef.current?.value || !passwordRef.current?.value) return
      const signinDto = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      dispatch(signin(signinDto))
  }
  return (
    <main className='login window'>
      <ThemeToggle dispatch={dispatch} />
      <h2 data-theme="headline">Auth Wiedersehen</h2>
      <h1 data-theme="headline">Login</h1>
      <form onSubmit={(e)=> onLogin(e)}>
        <div className="input-box">
          <input id="login-email" ref={emailRef} type="email" required autoComplete="" />
          <label htmlFor="login-email"><IoMdMail /> Email</label>
        </div>

        <div className="input-box">
          <input id="login-password" ref={passwordRef} type="password" required autoComplete="" />
          <label htmlFor="login-password" className="input-password"><IoMdLock /> Password</label>
        </div>
        
        <button type="submit" className="call-to-action" data-theme="call-to-action">Login</button>
      </form>
      <p className="text" data-theme="text">or continue with these social profiles</p>
      <div className="social-strategy-list">
        { Object.keys(strategies).map( (media, idx) => {
          return <button key={`login-strategy-${Object.keys(strategies)[idx]}`} className="social-container" onClick={strategies[media as keyof typeof strategies].handler}>{strategies[media as keyof typeof strategies].icon}</button>
        })}
      </div>
      <p data-theme="text">Don’t have an account yet? <Link to='/signup'>Register</Link></p>
      <p className="footnote creator text" data-theme="text">created by <u><b>Erez Eitan</b></u></p>
      <p className="footnote credit text" data-theme="text">devChallenges.io</p>
    </main>
  )
}

export default Login