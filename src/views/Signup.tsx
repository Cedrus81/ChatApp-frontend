import { useCallback, useMemo } from "react"
import { useFormik, FastField } from "formik";
import { IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait, IoIosFlag } from "react-icons/io"
import { BsFillFileEarmarkPersonFill, BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import { countries } from "../data"
import { signupSchema } from "../schemas";
import InputBox from "../cmps/InputBox";
import { useAppDispatch, useAppSelector } from "../hooks";
import ThemeToggle from "../cmps/ThemeToggle";
import { setTheme } from "../store/slices/styleSlice";
import { FieldData } from "../types";
function Signup() {
    const dispatch = useAppDispatch()
    // const currTheme = useAppSelector(state => state.style.theme)
    const {handleSubmit, errors, touched, isSubmitting,
        values,
        handleChange,
        handleBlur} = useFormik({
        initialValues:{
            email: '',
            password: '',
            name:'',
            bio: '',
            phone: '',
            dial: '',
        },
        validationSchema: signupSchema,
        onSubmit
    })
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

    function onSubmit(values:any, actions:any){
        console.log(values)
        actions.resetForm()
    }

    function inputClasses(field:string): string{
        return isFloating(field) ? 'floating' : ''
    }

    // label should be floating as long as field isn't empty, or is focused (handled by the CSS)
    function isFloating(field: string  ){
        return values[field as keyof typeof values]
    }
   
    // function toggleTheme(){
    //     dispatch(currTheme === 'light' ? setTheme('dark') : setTheme('light'))
    // }

    // const inputBoxProps = useCallback((fieldName: string, idx: number, fields: FieldData[]) => {
    //     const data = fields[idx] as FieldData
    //     const value = values[fieldName as keyof typeof values]
    //     const error = errors[fieldName as keyof typeof errors]
    //     const isTouched = touched[fieldName as keyof typeof touched]
    //     const classes = inputClasses
    //     return {
    //         data,
    //         value,
    //         isTouched,
    //         error,
    //         classes,
    //         handleChange,
    //         handleBlur,
    //      }
    // }, [handleChange])
    console.log('updated')

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
        {/* <button className="theme-toggle" data-theme="theme-toggle" onClick={toggleTheme}>{currTheme === 'light' ? <BsSunFill data-theme="svg" /> : <BsMoonStarsFill data-theme="svg" />}</button> */}
        <h2 data-theme="headline">Welcome to Auth Wiedersehen!</h2>
        <p className="text" data-theme="text">Please add in your credentials (email and password), any other personal detail is optional, and can be updated later on.
            <br />
            <b>Important:</b> There is no need for any detail here to be authentic!
            <br />
        </p>
        <form onSubmit={handleSubmit}>
            {fields.map(field => <InputBox key={field.id} value={values[field.id as keyof typeof values]} handleChange={handleChange} handleBlur={handleBlur} data={field} isTouched={touched[field.id as keyof typeof touched]} error={errors[field.id as keyof typeof errors]} classes={inputClasses}/>)}
            {/* {fields.map((field, idx) => { return (<InputBox key={field.id} {...inputBoxProps(field.id, idx, fields)}/>)})} */}

            <div className="divided-input-box">
                {CountryDatalist}
            {phoneFields.map(field => <InputBox key={field.id} value={values[field.id as keyof typeof values]} handleChange={handleChange} handleBlur={handleBlur} data={field} isTouched={touched[field.id as keyof typeof touched]} error={errors[field.id as keyof typeof errors]} classes={inputClasses}/>)}
            {/* {phoneFields.map((field, idx) => <InputBox key={field.id} {...inputBoxProps(field.id, idx, phoneFields)}/>)} */}

            </div>
            <button type="submit" className="call-to-action" data-theme="call-to-action">Sign up</button>
        </form>
        <p className="text" data-theme="text">Already have a user? <Link to='/'>Login page</Link></p>
    </main>
  )
}

export default Signup