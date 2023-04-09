import { useEffect, useRef } from "react"
import { User } from "../types"
import { FaUserAlt } from "react-icons/fa"

type UploadWidgetProps = {
  setValue: (value: string) => void
  user: User
}
function UploadWidget({ setValue, user }: UploadWidgetProps) {
    const cloudinaryRef = useRef<any>()
    const widgetRef = useRef<any>()
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        if(cloudinaryRef.current){
          widgetRef.current = cloudinaryRef.current.createUploadWidget({
                cloudName: import.meta.env.VITE_CLOUD_NAME,
                uploadPreset: import.meta.env.VITE_CLOUD_PRESET,
                cropping: true,
                multiple: false
            }, function(error: any, result: any){
              if (!error && result?.event === 'success') { 
                console.log('Done! Here is the image info: ', result.info);
                setValue(result.info.url)
              }
            })
        }
    },[])
  return (
    <div className="widget-container">
      {user.photo ? 
      (<img 
      src={`url(${user.photo})`} 
      alt="user-photo"
      className="user-photo" 
      onClick={() => widgetRef.current.open()} 
      style={{backgroundImage: user.photo ? `url(${user.photo})` : ``}} />
      ) 
      : 
      (<div 
        className="placeholder-photo"
        onClick={() => widgetRef.current.open()} 
        data-theme="call-to-action"><FaUserAlt /></div>)
      }
      </div>
  )
}

export default UploadWidget