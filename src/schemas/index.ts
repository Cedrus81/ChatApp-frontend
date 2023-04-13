import * as yup from 'yup'
import { countries } from "../data"

const EditPasswordRules = /^$/ || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/

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

export const editSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email'),
    password: yup.string().matches(EditPasswordRules, '8-20 chars, from which: 1 uppercase, 1 lowercase, 1 digit'),
    bio: yup.string().matches(/^.{25,}$|^$/, 'Must be at least 25 character long'),
    name: yup.string().matches(/^(?:[A-Za-z]+(?:\s+[A-Za-z]+)*)?$/, 'Must be a valid name'),
    phone: yup.string().optional().matches(/^$/ || /^\d{10}/, '10 digits, only numbers'),
    dial: yup.string().fromCountryList('Unknown code'),
})

export const signupSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Required'),
    password: yup.string().matches(passwordRules, '8-20 chars, from which: 1 uppercase, 1 lowercase, 1 digit').required('Required'),
    bio: yup.string().matches(/^.{25,}$|^$/, 'Must be at least 25 character long'),
    name: yup.string().matches(/^(?:[A-Za-z]+(?:\s+[A-Za-z]+)*)?$/, 'Must be a valid name'),
    phone: yup.string().optional().matches(/^\d{10}/, '10 digits, only numbers'),
    dial: yup.string().fromCountryList('Unknown code'),
})

export const loginSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Required'),
    password: yup.string().min(8).max(20).matches(passwordRules, '5-20 chars, from which: 1 uppercase, 1 lowercase, 1 number').required('Required'),
})

