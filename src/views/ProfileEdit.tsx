import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useUser } from "../hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import { editSchema } from "../schemas"
import { useForm } from "react-hook-form"
import { FieldData, SignupFormValues } from "../types"
import { IoIosFlag, IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait } from "react-icons/io"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs"

import CountryDatalist from "../cmps/CountryDatalist";
import InputBoxRHF from "../cmps/InputBoxRHF"
import { utilService } from "../services/utils.service"
import { updateUser } from "../store/slices/userSlice"
import LoadingWheel from "../cmps/LoadingWheel"

function ProfileEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useUser()
  if(!user){
    return (<></>)
  }

  const {register, handleSubmit, formState: {errors, dirtyFields, isSubmitting}, trigger, resetField, getValues} = useForm<SignupFormValues>({
    resolver: yupResolver(editSchema),
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
    [{ id: 'name',
    icon: <IoMdPerson/>,
    }],
    [ { id: 'bio',
     icon: <BsFillFileEarmarkPersonFill />,
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
    [{ id: 'email',
     icon: <IoMdMail />,
    }],
    [{id: 'password',
     icon: <IoMdLock />,
     title: '8-20 characters, at least 1 of each: Capital, lowercase, digit'}],
  ]

  async function onSubmit(data: SignupFormValues){
    if(!user) throw new Error('user not found')

    const dto = utilService.signupToDto(data)
    dto.id = user.id
    await dispatch(updateUser(dto))
    navigate('/my-profile')
  }

  if(isSubmitting){
    return(
      <main className="profile-edit">
        <article className="window profile-edit-container">
          <LoadingWheel title="Updating your info..." />
        </article>
      </main>
    )
  }

  return (
    <main className="profile-edit">
      <Link to="/my-profile">Back</Link>
      <article className="window profile-edit-container">
        <section className="profile-edit-header">
          <h2 data-theme="headline">Change Info</h2>
          <p data-theme="text">Changes will be reflected to every services</p>
        </section>
        <form onSubmit={(e)=>handleSubmit(onSubmit)(e).catch((e)=>{
            // todo: add error handling logic
            console.log('serverside errors etc. logic should be here', e)})}>
          <section className="change-photo">

          </section>
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
      </article>
    </main>
  )
}

export default ProfileEdit