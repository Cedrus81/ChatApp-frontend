import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useUser } from "../hooks"
import { yupResolver } from "@hookform/resolvers/yup"
import { editSchema } from "../schemas"
import { useForm } from "react-hook-form"
import { SignupFormValues } from "../types"
import { fields } from "../data"
import { utilService } from "../services/utils.service"
import { updateUser } from "../store/slices/userSlice"
import { IoChevronBackSharp } from "react-icons/io5"
import InputBoxRHF from "../cmps/InputBoxRHF"
import CountryDatalist from "../cmps/CountryDatalist";
import LoadingWheel from "../cmps/LoadingWheel"
import UploadWidget from "../cmps/UploadWidget"
import { useMemo } from "react"

function ProfileEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useUser()

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

  const sortedFields = useMemo(() => {
    const fieldOrder: string[] = [
      'name',
      'bio',
      'dial',
      'email',
      'password'
    ]
    return fieldOrder.map(name => {
      return fields.find(field => field[0].id === name)!
    })
  },[fields])

  async function setUserPhoto(url: string){
    if(!user) throw new Error('user not found')

    const dto = {
      id: user.id,
      photo: url
    }
    await dispatch(updateUser(dto))
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
      <article className="window profile-edit-container">
      <Link to="/my-profile"><IoChevronBackSharp /> <span>Back</span></Link>
        <section className="profile-edit-header">
          <h2 data-theme="headline">Change Info</h2>
          <p data-theme="text">Changes will be reflected to every services</p>
        </section>
        <section>
            <UploadWidget setValue={(value: string)=> setUserPhoto(value)} user={user!} />
        </section>
        <form onSubmit={(e)=>handleSubmit(onSubmit)(e).catch((e)=>{
            // todo: add error handling logic
            console.log('serverside errors etc. logic should be here', e)})}>


            {sortedFields.map((field) => { return (
                <div key={`${field[0].id}-container`} className={field!.length > 1 ? 'divided-input-box' : 'full-input-box'}>
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