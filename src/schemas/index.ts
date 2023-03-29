import * as yup from 'yup'
import { countries } from "../data"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

declare module 'yup' {
    interface StringSchema {
        fromCountryList(message: string): StringSchema
    }
}

yup.addMethod(yup.string, 'fromCountryList', function(message){
    return this.test('isFromList', message, function(value){
        const { path, createError } = this;
        return countries.some(ctry => ctry.dial_code === value) || !value || createError({path, message})
    })
})

export const signupSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Required'),
    password: yup.string().min(5).max(20).matches(passwordRules, '5-20 chars, from which: 1 uppercase, 1 lowercase, 1 number').required('Required'),
    bio: yup.string().min(25, 'Must be at least 25 character long'),
    name: yup.string().min(2, 'Must be longer'),
    dial: yup.string().fromCountryList('Unknown code'),
    phone: yup.string().matches(/^\d{10}/, '10 digits, only numbers')
})

