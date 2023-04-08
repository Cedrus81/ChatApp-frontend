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
    const {id, icon, title, flexRatio, list} = data
    function shouldDisplayError(){
        return error && isDirty
    }
    const memoizedInputBox = useMemo(()=>{
      const resetIcon = <VscDebugRestart />
      const commonProps = {
        id,
        title,
        ...register,
        'data-theme': `background text ${shouldDisplayError() ? 'error border' : ''}`,
        className: isDirty ? 'floating' : ''
      }
      return(
        <div className={`input-box ${flexRatio === 1 ? 'left' : flexRatio && flexRatio > 1 ? 'right' : ''}`} style={{ flex: flexRatio}}>
          
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
          <button className={`reset-field ${currVal ? 'on' : ''}`} data-theme="headline" onClick={resetField}>{resetIcon}</button>
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