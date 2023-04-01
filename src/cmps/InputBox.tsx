import { ChangeEventHandler, FocusEventHandler } from "react"

type InputBoxProps = {
    data: {id: string, icon: JSX.Element, title?: string,  flexRatio?: number, list?: string}
    value: string
    error: string | undefined
    handleChange: ChangeEventHandler<Element>
    handleBlur: FocusEventHandler<Element>
    touched: boolean | undefined
    classes: Function
}

function InputBox(props: InputBoxProps) {
    const {data, value, error, handleChange, handleBlur, touched, classes } = props
    const {id, icon, title, flexRatio, list} = data
    function shouldDisplayError() {
      return error && value && touched
    }
  return (
    <div className={`input-box ${flexRatio === 1 ? 'left' : flexRatio && flexRatio > 1 ? 'right' : ''}`} style={{ flex: flexRatio}}>
        {id === 'bio' && <textarea value={value} onChange={handleChange} onBlur={handleBlur} id={id} className={classes(id)} data-theme={`background text ${shouldDisplayError() ? 'error border' : ''}`} ></textarea>}
        {id !== 'bio' && <input value={value} onChange={handleChange} onBlur={handleBlur} id={id} type={id === 'password' ? 'password' : 'text'} className={classes(id)} data-theme={`background text ${shouldDisplayError() ? 'error border' : ''}`} title={title} list={list} />}
        <label htmlFor={id} data-theme={`background text ${shouldDisplayError() ? ' error text' : ''}`}>{icon}{id.charAt(0).toUpperCase() + id.slice(1)}</label>
        {shouldDisplayError() && <p className="error-msg" data-theme="error text">{error}</p>}
    </div>
  )
}

export default InputBox