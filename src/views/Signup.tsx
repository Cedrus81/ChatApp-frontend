import { useMemo } from "react"
import { useFormik } from "formik";
import { IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait, IoIosFlag } from "react-icons/io"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

import { Link } from "react-router-dom"
import { countries } from "../data"
import { signupSchema } from "../schemas";
function Signup(this: any) {
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

    function onSubmit(values:any, actions:any){
        console.log(values)
        actions.resetForm()
    }

    function inputClasses(field:string): string{
        let classes = ''
        classes += isInvalid(field) ? 'invalid ' : ''
        classes += isFloating(field) ? 'floating' : ''
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
    <section className='login window'>
        <h2>Welcome to Auth Wiedersehen!</h2>
        <p>Please add in your credentials (email and password), any other personal detail is optional, and can be updated later on.
            <br />
            <b>Important:</b> There is no need for any detail here to be authentic!
        </p>
        <form onSubmit={handleSubmit}>
            <div className="input-box">
                <input value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" type="text" className={inputClasses('email')}  />
                <label htmlFor="email"><IoMdMail /> Email</label>
                {values.email  && touched.email && <p className="error-msg">{errors.email}</p>}
            </div>
            <div className="input-box">
                <input value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" type="password" className={inputClasses('password')} />
                <label htmlFor="password" className="input-password"><IoMdLock /> Password</label>
                {values.password  && touched.password && <p className="error-msg">{errors.password}</p>}

            </div>
            <div className="input-box">
                <input value={values.name} onChange={handleChange} onBlur={handleBlur} id="name" type="text" className={inputClasses('name')}  />
                <label htmlFor="name"><IoMdPerson/> Name</label>
                {values.name  && touched.name && <p className="error-msg">{errors.name}</p>}
            </div>
            <div className="multi-input-box">
                <div className="input-box left">
                    <input value={values.dial} onChange={handleChange} onBlur={handleBlur} id="dial" type="text" list="country-codes" className={inputClasses('dial')}  />
                    <label htmlFor="dial"><IoIosFlag /> Code </label>
                    {values.dial  && touched.dial && <p className="error-msg">{errors.dial}</p>}

                    {CountryDatalist}
                </div>
                <div className="input-box right">
                    <input value={values.phone} onChange={handleChange} onBlur={handleBlur} id="phone" type="text" title="10 digits length, e.g. 0541234567" className={inputClasses('phone')}  />
                    <label htmlFor="phone" ><IoMdPhonePortrait /> Phone number</label>
                    {values.phone  && touched.phone && <p className="error-msg">{errors.phone}</p>}

                </div>
            </div>
            <div className="input-box">
                <textarea value={values.bio} onChange={handleChange} onBlur={handleBlur} id="bio" cols={30} className={inputClasses('bio')} ></textarea>
                <label htmlFor="bio"><BsFillFileEarmarkPersonFill /> Bio</label>
                {values.bio && touched.bio && <p className="error-msg">{errors.bio}</p>}

            </div>
            <button type="submit">Sign up</button>
        </form>
        <p>Already have a user? <Link to='/'>Login page</Link></p>
    </section>
  )
}

export default Signup