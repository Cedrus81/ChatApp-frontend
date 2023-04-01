import { useEffect, useMemo } from "react"
// import { useFormik } from "formik";
import { IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait, IoIosFlag } from "react-icons/io"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import { countries } from "../data"
import { signupSchema } from "../schemas";
import { useAppDispatch } from "../hooks";
import { FieldData } from "../types";
import {yupResolver} from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import ThemeToggle from "../cmps/ThemeToggle";
import InputBox from "../cmps/InputBox";
import InputBoxRHF from "../cmps/InputBoxRHF";

type SignupFormValues = {
    email: string
    password: string
    name:string
    bio: string
    phone: string
    dial: string
}

function Signup() {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {errors, dirtyFields, isSubmitting}, watch, reset} = useForm<SignupFormValues>({
        resolver: yupResolver(signupSchema),
        defaultValues:{
            email: '',
            password: '',
            name: '',
            bio: '',
            phone: '',
            dial: ''
        },
    })
    // useEffect(() => {
    //   const subscription = watch((data) => {
    //     console.log(data)
    // })
    //   return () => {
    //     subscription.unsubscribe()
    //   }
    // }, [watch])
    // const {handleSubmit, errors, touched, isSubmitting,
    //     values,
    //     handleChange,
    //     handleBlur} = useFormik({
    //     initialValues:{
    //         email: '',
    //         password: '',
    //         name:'',
    //         bio: '',
    //         phone: '',
    //         dial: '',
    //     },
    //     validationSchema: signupSchema,
    //     onSubmit
    // })
    const fields: FieldData[] = [
       { id: 'email',
        icon: <IoMdMail />,
        },
        {id: 'password',
         icon: <IoMdLock />,
         title: '5-20 characters, at least 1 of each: Capital, lowercase, digit'},
        { id: 'name',
        icon: <IoMdPerson/>,
        },
        { id: 'bio',
        icon: <BsFillFileEarmarkPersonFill />,
        },
    ]
    const phoneFields: FieldData[] = [
        {
            id: 'dial',
            icon: <IoIosFlag />,
            flexRatio: 1,
            list: 'country-codes'
        },
        {
            id: 'phone',
            icon: <IoMdPhonePortrait />,
            flexRatio: 2.5,
            title: '10 digits length, e.g. 0541234567'
        }
    ]

    function onSubmit(data: any){
        console.log(data)
        reset()
        // actions.resetForm()
    }

    // function inputClasses(field:string): string{
    //     return isFloating(field) ? 'floating' : ''
    // }

    // label should be floating as long as field isn't empty, or is focused (handled by the CSS)
    // function isFloating(field: string  ){
    //     return values[field as keyof typeof values]
    // }
   

    const CountryDatalist = useMemo(() =>
            <datalist id="country-codes" >
                {countries.map( country => 
                  <option key={country.code} value={country.dial_code}>
                    {country.flag + ' ' + country.name}
                  </option>  
                )}
            </datalist>, [countries])
  return (
    <main className='login window'>
        <ThemeToggle dispatch={dispatch} />
        <h2 data-theme="headline">Welcome to Auth Wiedersehen!</h2>
        <p className="text" data-theme="text">Please add in your credentials (email and password), any other personal detail is optional, and can be updated later on.
            <br />
            <b>Important:</b> There is no need for any detail here to be authentic!
            <br />
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* {fields.map(field => <InputBox key={field.id} value={values[field.id as keyof typeof values]} handleChange={handleChange} handleBlur={handleBlur} data={field} isTouched={touched[field.id as keyof typeof touched]} error={errors[field.id as keyof typeof errors]} classes={inputClasses}/>)} */}
            {fields.map((field) => { return (<InputBoxRHF key={field.id} register={register(field.id)} data={field} error={errors[field.id as keyof typeof errors]} isDirty={dirtyFields[field.id as keyof typeof dirtyFields]}/>)})}

            <div className="divided-input-box">
                {CountryDatalist}
            {/* {phoneFields.map(field => <InputBox key={field.id} value={values[field.id as keyof typeof values]} handleChange={handleChange} handleBlur={handleBlur} data={field} isTouched={touched[field.id as keyof typeof touched]} error={errors[field.id as keyof typeof errors]} classes={inputClasses}/>)} */}
            {/* {phoneFields.map((field, idx) => <InputBox key={field.id} {...inputBoxProps(field.id, idx, phoneFields)}/>)} */}

            </div>
            <button type="submit" className="call-to-action" data-theme="call-to-action">Sign up</button>
        </form>
        <p className="text" data-theme="text">Already have a user? <Link to='/'>Login page</Link></p>
    </main>
  )
}

export default Signup