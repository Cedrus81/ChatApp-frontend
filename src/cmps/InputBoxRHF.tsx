import { useCallback } from "react"
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form"
import { FieldData } from "../types"

type InputBoxRHFProps = {
    data: FieldData
    register: UseFormRegisterReturn<string>
    error: FieldError | (Record<string, Partial<{ type: string | number; message: string; }>> & Partial<{ type: string | number; message: string; }>) | undefined
    isDirty: boolean | undefined
}

function InputBoxRHF(props: InputBoxRHFProps) {
    const {register, data, error, isDirty} = props
    const {id, icon, title, flexRatio, list} = data
    function shouldDisplayError(){
        return error && isDirty
    }
  return (
    <div className={`input-box ${flexRatio === 1 ? 'left' : flexRatio && flexRatio > 1 ? 'right' : ''}`} style={{ flex: flexRatio}}>
        {id === 'bio' && <textarea id={id} title={title}  data-theme={`background text ${shouldDisplayError() ? 'error border' : ''}`} {...register} className={isDirty ? 'floating' : ''} ></textarea>}
        {id !== 'bio' &&<input id={id} title={title} list={list} type={id === 'password' ? 'password' : 'text'} data-theme={`background text ${shouldDisplayError() ? 'error border' : ''}`} {...register} className={isDirty ? 'floating' : ''} />}
        <label htmlFor={id} data-theme={`background text ${shouldDisplayError() ? ' error text' : ''}`}>{icon}{id.charAt(0).toUpperCase() + id.slice(1)}</label>
        {shouldDisplayError() && <p className="error-msg" data-theme="error text">{error?.message?.toString()}</p>}
    </div>

  )
}

export default InputBoxRHF