import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useSessionExpired, useUser } from "../hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import { editSchema } from "../schemas"
import { useForm } from "react-hook-form"
import { FieldData, SignupFormValues } from "../types"
import { IoIosFlag, IoMdLock, IoMdMail, IoMdPerson, IoMdPhonePortrait } from "react-icons/io"
import { BsFillFileEarmarkPersonFill } from "react-icons/bs"
import { fields, photoData } from "../data"
import { utilService } from "../services/utils.service"
import { updateUser } from "../store/slices/userSlice"

import InputBoxRHF from "../cmps/InputBoxRHF"
import CountryDatalist from "../cmps/CountryDatalist";
import LoadingWheel from "../cmps/LoadingWheel"
import UploadWidget from "../cmps/UploadWidget"

function ProfileEdit() {
  useSessionExpired()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useUser()

  const {register, handleSubmit, formState: {errors, dirtyFields, isSubmitting}, trigger, resetField, getValues, setValue} = useForm<SignupFormValues>({
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
  // todo reorganize l8r with fieldOrder
  const fieldOrder: string[] = [
    'name',
    'bio',
    'phone',
    'email',
    'password'
  ]

  async function setUserPhoto(url: string){
    if(!user) throw new Error('user not found')

    const dto = {
      id: user.id,
      photo: url
    }
    await dispatch(updateUser(dto))
    console.log('updated successfully:', user)
  }

  async function onSubmit(data: SignupFormValues){
    if(!user) throw new Error('user not found')

    const dto = {
      id: user.id,
      ...utilService.signupToDto(data),
    }
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
        <section>
            <UploadWidget setValue={(value: string)=> setUserPhoto(value)} user={user} />
        </section>
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
            <button type="submit" className="call-to-action" data-theme="call-to-action">Save</button>
        </form>
      </article>
    </main>
  )
}

export default ProfileEdit