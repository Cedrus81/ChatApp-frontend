import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { VscDebugRestart } from "react-icons/vsc"
import { FieldData } from "../types"
import { useMemo } from "react"

type InputBoxRHFProps = {
    data: FieldData
    register: UseFormRegisterReturn<string>
    error: FieldError | (Record<string, Partial<{ type: string | number; message: string; }>> & Partial<{ type: string | number; message: string; }>) | undefined
    isDirty: boolean | undefined
    currVal: string
    resetField: () => void
}

function InputBoxRHF({register, data, error, isDirty, currVal, resetField}: InputBoxRHFProps) {
    const {id, icon, title, list, style, disabled} = data
    function shouldDisplayError(){
        return error && isDirty
    }
    const memoizedInputBox = useMemo(()=>{
      const commonProps = {
        id,
        title,
        style,
        disabled,
        ...register,
        'data-theme': `background text ${shouldDisplayError() ? 'error border' : ''}`,
        className: isDirty || disabled ? 'floating' : '',
      }
      return(
        <div className={`input-box ${style?.flex === 1 ? 'left' : style?.flex && style?.flex > 1 ? 'right' : ''}`}>
          
          {id === 'bio' ? (
            <textarea  {...commonProps}></textarea>
           )
           : 
           (
            <input 
            {...commonProps}
            list={list}
            type={id === 'password' ? 'password' : 'text'} 
            autoComplete={id === 'password' ? 'current-password' : ''} />
          )}
        
          <label htmlFor={id} data-theme={`background text ${shouldDisplayError() ? 'error' : ''}`}>{icon}{id.charAt(0).toUpperCase() + id.slice(1)}</label>
          <button className={`reset-field ${currVal ? 'on' : ''}`} data-theme="headline" onClick={resetField}><VscDebugRestart /></button>
          {shouldDisplayError() && <p className="error-msg" data-theme="error text">{error?.message?.toString()}</p>}
    </div>
      )
    },[currVal, error])
  return (
    <>
      {memoizedInputBox}
    </>

  )
}

export default InputBoxRHF