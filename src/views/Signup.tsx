import { FormEvent, useMemo, useRef } from "react"
import { useFormik } from "formik";
import { IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait, IoIosFlag } from "react-icons/io"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

import { Link } from "react-router-dom"
import { countries } from "../data"
import { signupSchema } from "../schemas";
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

    function onSubmit(values:any, actions:any){
        console.log(values)
        actions.resetForm()
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
        <p>Please add in your credentials (email and password), any other personal detail is optional, and can be updated later on</p>
        <form onSubmit={handleSubmit}>
            <div className="input-box">
                <input value={values.email} onChange={handleChange} onBlur={handleBlur} id="email" type="text" className={errors.email && touched.email ? 'invalid' : ''} required />
                <label htmlFor="email"><IoMdMail /> Email</label>
            </div>
            <div className="input-box">
                <input value={values.password} onChange={handleChange} onBlur={handleBlur} id="password" type="password" className={errors.password && touched.password ? 'invalid' : ''} required />
                <label htmlFor="password" className="input-password"><IoMdLock /> Password</label>
            </div>
            <div className="input-box">
                <input value={values.name} onChange={handleChange} onBlur={handleBlur} id="name" type="text" className={errors.name && touched.name ? 'invalid' : ''}  />
                <label htmlFor="name"><IoMdPerson/> Name</label>
            </div>
            <div className="multi-input-box">
                <div className="input-box left">
                    <input value={values.dial} onChange={handleChange} onBlur={handleBlur} id="dial" type="text" list="country-codes" className={errors.dial && touched.dial ? 'invalid' : ''}  />
                    <label htmlFor="dial"><IoIosFlag /> Code </label>
                    {CountryDatalist}
                </div>
                <div className="input-box right">
                    <input value={values.phone} onChange={handleChange} onBlur={handleBlur} id="phone" type="tel" title="10 digits length, e.g. 0541234567" className={errors.phone && touched.phone ? 'invalid' : ''}  />
                    <label htmlFor="phone" ><IoMdPhonePortrait /> Phone number</label>
                </div>
            </div>
            <div className="input-box">
                <textarea value={values.bio} onChange={handleChange} onBlur={handleBlur} id="bio" cols={30} ></textarea>
                <label htmlFor="bio"><BsFillFileEarmarkPersonFill /> Bio</label>
            </div>
            <button type="submit">Sign up</button>
        </form>
        <p>Already have a user? <Link to='/'>Login page</Link></p>
    </section>
  )
}

export default Signup