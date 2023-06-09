import { useEffect } from "react"
// import { IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait, IoIosFlag } from "react-icons/io"
// import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"
import { signupSchema } from "../schemas";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SignupFormValues } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signup } from "../store/slices/userSlice";
import { utilService } from "../services/utils.service";
import { fields } from "../data";

import ThemeToggle from "../cmps/ThemeToggle";
import InputBoxRHF from "../cmps/InputBoxRHF";
import LoadingWheel from "../cmps/LoadingWheel";
import CountryDatalist from "../cmps/CountryDatalist";


function Signup() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.loggedInUser)
    useEffect(() => {
        if(user) navigate('/')
    })


    const {register, handleSubmit, formState: {errors, dirtyFields, isSubmitting}, trigger, resetField, getValues} = useForm<SignupFormValues>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            bio: '',
            phone: '',
            dial: '',
        },
    })


    async function onSubmit(data: SignupFormValues){
        const dto = utilService.signupToDto(data)
        await dispatch(signup(dto))
        navigate('/my-profile')
    }


    
    if (isSubmitting){
        return (
          <main className='login window'>
              <LoadingWheel title="Signing you in..." />
          </main>
        )
    }

      
    return (
        <main className='login window'>
            <ThemeToggle dispatch={dispatch} />
            <h2 data-theme="headline">Welcome to Auth Wiedersehen!</h2>
            <p className="text" data-theme="text">Please add in your credentials (email and password), any other personal detail is optional, and can be updated later on.
                <br />
                <b>Important:</b> There is no need for any detail here to be authentic!
                <br />
            </p>
            <form onSubmit={(e)=>handleSubmit(onSubmit)(e).catch((e)=>{
                // todo: add error handling logic
                console.log('serverside errors etc. logic should be here', e)})}>
                {fields.map((field) => { return (
                    <div key={`${field[0].id}-container`} className={field.length > 1 ? 'divided-input-box' : 'full-input-box'}>
                    {field.map(data => {
                        return (
                            <InputBoxRHF 
                            key={data.id} 
                            data={data} 
                            register={register(data.id as keyof SignupFormValues, {onBlur: () => {trigger(data.id as keyof SignupFormValues)}})} 
                            error={errors[data.id as keyof typeof errors]} 
                            isDirty={dirtyFields[data.id as keyof typeof dirtyFields]} 
                            currVal={getValues(data.id as keyof SignupFormValues)}
                            resetField={()=>resetField(data.id as keyof SignupFormValues)}
                            />
                        )
                })}
                </div>
                )})}
                <CountryDatalist />

                <button type="submit" className="call-to-action" data-theme="call-to-action">Sign up</button>
            </form>
            <p className="text" data-theme="text">Already have a user? <Link to='/'>Login page</Link></p>
            <p className="footnote creator text" data-theme="text">created by <u><b>Erez Eitan</b></u></p>
            <p className="footnote credit text" data-theme="text">devChallenges.io</p>
        </main>
    )
}

export default Signup