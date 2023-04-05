import { useMemo } from "react"
import { IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait, IoIosFlag } from "react-icons/io"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import { countries } from "../data"
import { signupSchema } from "../schemas";
import { useAppDispatch } from "../hooks";
import { FieldData } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import ThemeToggle from "../cmps/ThemeToggle";
import InputBoxRHF from "../cmps/InputBoxRHF";

type SignupFormValues = {
    email: string
    password: string
    name:string
    bio: string
    phone: string
    dial: string
}
//todo add a resetfield option (button) to each input
function Signup() {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, formState: {errors, dirtyFields, isSubmitting}, reset, trigger, resetField, getValues} = useForm<SignupFormValues>({
        resolver: yupResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            bio: '',
            phone: '',
            dial: ''
        },
    })
    
    const fields: FieldData[][] = [
       [{ id: 'email',
        icon: <IoMdMail />,
        }],
        [{id: 'password',
         icon: <IoMdLock />,
         title: '5-20 characters, at least 1 of each: Capital, lowercase, digit'}],
        [{ id: 'name',
        icon: <IoMdPerson/>,
        }],
        [
            {
                id: 'dial',
                icon: <IoIosFlag />,
                flexRatio: 1,
                list: 'country-codes'
            },
            {
                id: 'phone',
                icon: <IoMdPhonePortrait />,
                flexRatio: 2,
                title: '10 digits length, e.g. 0541234567'
            }
        ],
       [ { id: 'bio',
        icon: <BsFillFileEarmarkPersonFill />,
        }],
    ]

    function onSubmit(data: SignupFormValues){
        console.log('success',data)
        
        // todo dispatch and action and redirect after
        reset()
        // actions.resetForm()
    }
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
            {CountryDatalist}
            <button type="submit" className="call-to-action" data-theme="call-to-action">Sign up</button>
        </form>
        <p className="text" data-theme="text">Already have a user? <Link to='/'>Login page</Link></p>
    </main>
  )
}

export default Signup