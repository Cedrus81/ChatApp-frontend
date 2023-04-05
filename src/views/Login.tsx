import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMdMail, IoMdLock } from "react-icons/io";
import {  faGithub, faGoogle, faTwitter, faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { FormEvent } from "react";
import { useAppDispatch } from "../hooks";
import { signin } from "../store/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schemas";

import ThemeToggle from "../cmps/ThemeToggle";
import InputBoxRHF from "../cmps/InputBoxRHF";
import { useForm } from "react-hook-form";
import { FieldData } from "../types";

type LoginFormValues = {
  email: string
  password: string
}

function Login() {
  const dispatch = useAppDispatch()
  const {register, handleSubmit, formState: {errors, dirtyFields, isSubmitting}, trigger, resetField, getValues} = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
        email: '',
        password: '',
    },
})
const fields: FieldData[] = [
  { id: 'email',
   icon: <IoMdMail />,
   },
   {id: 'password',
    icon: <IoMdLock />,
    title: '5-20 characters, at least 1 of each: Capital, lowercase, digit'},
  ]
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
  function onSubmit(data: LoginFormValues){
    console.log('success',data)
  }
  return (
    <main className='login window'>
      <ThemeToggle dispatch={dispatch} />
      <h2 data-theme="headline">Auth Wiedersehen</h2>
      <h1 data-theme="headline">Login</h1>
      <form onSubmit={(e)=>handleSubmit(onSubmit)(e).catch((e)=>{
            // todo: add error handling logic
            console.log('serverside errors etc. logic should be here', e)})}>
        {fields.map(data => {
                    return (
                        <InputBoxRHF 
                        key={data.id} 
                        data={data} 
                        register={register(data.id as keyof LoginFormValues, {onBlur: () => {trigger(data.id as keyof LoginFormValues)}})} 
                        error={errors[data.id as keyof typeof errors]} 
                        isDirty={dirtyFields[data.id as keyof typeof dirtyFields]} 
                        currVal={getValues(data.id as keyof LoginFormValues)}
                        resetField={()=>resetField(data.id as keyof LoginFormValues)}
                        />
                    )
            })}
        
        <button type="submit" className="call-to-action" data-theme="call-to-action">Login</button>
      </form>
      <p className="text" data-theme="text">or continue with these social profiles</p>
      <div className="social-strategy-list">
        { Object.keys(strategies).map( (media, idx) => {
          return <button 
          key={`login-strategy-${Object.keys(strategies)[idx]}`} 
          className="social-container" 
          onClick={strategies[media as keyof typeof strategies].handler}
          data-theme="background text">{strategies[media as keyof typeof strategies].icon}</button>
        })}
      </div>
      <p data-theme="text">Don’t have an account yet? <Link to='/signup'>Register</Link></p>
      <p className="footnote creator text" data-theme="text">created by <u><b>Erez Eitan</b></u></p>
      <p className="footnote credit text" data-theme="text">devChallenges.io</p>
    </main>
  )
}

export default Login