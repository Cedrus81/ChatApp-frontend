import { useMemo } from "react"
import { useFormik } from "formik";
import { IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait, IoIosFlag } from "react-icons/io"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom"
import { countries } from "../data"
import { signupSchema } from "../schemas";
import InputBox from "../cmps/InputBox";

function Signup() {
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
    const fields = [
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
    const phoneFields = [
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
        let classes = ''
        classes += isInvalid(field) ? 'invalid ' : ''
        classes += isFloating(field) ? 'floating ' : ''
        return classes
    }

    // invalid if data is invalid, isn't empty, field was already visited AND isn't focused (handled by CSS)
    function isInvalid(field: string  ){
        return (errors[field as keyof typeof values] && touched[field as keyof typeof values] && values[field as keyof typeof values])
    }

    // label should be floating as long as field isn't empty, or is focused (handled by the CSS)
    function isFloating(field: string  ){
        return values[field as keyof typeof values]
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
        <h2 data-theme="headline">Welcome to Auth Wiedersehen!</h2>
        <p className="text" data-theme="text">Please add in your credentials (email and password), any other personal detail is optional, and can be updated later on.
            <br />
            <b>Important:</b> There is no need for any detail here to be authentic!
        </p>
        <form onSubmit={handleSubmit}>
            {fields.map(field => <InputBox key={field.id} value={values[field.id as keyof typeof values]} handleChange={handleChange} handleBlur={handleBlur} data={field} touched={touched[field.id as keyof typeof touched]} error={errors[field.id as keyof typeof errors]} classes={inputClasses}/>)}
            <div className="divided-input-box">
                {CountryDatalist}
            {phoneFields.map(field => <InputBox key={field.id} value={values[field.id as keyof typeof values]} handleChange={handleChange} handleBlur={handleBlur} data={field} touched={touched[field.id as keyof typeof touched]} error={errors[field.id as keyof typeof errors]} classes={inputClasses}/>)}
            </div>
            <button type="submit" className="call-to-action" data-theme="call-to-action">Sign up</button>
        </form>
        <p className="text">Already have a user? <Link to='/'>Login page</Link></p>
    </main>
  )
}

export default Signup