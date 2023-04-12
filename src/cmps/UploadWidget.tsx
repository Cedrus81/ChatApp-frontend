import { useEffect, useRef } from "react"
import { User } from "../types"
import { BsFillCameraFill } from "react-icons/bs"
import { utilService } from "../services/utils.service"

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
      (<div 
      className="user-photo" 
      onClick={() => widgetRef.current.open()} 
      style={{backgroundImage: user.photo ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${utilService.cloudinaryThumbnail(user.photo, 80)})` : ``}}><BsFillCameraFill /></div>
      ) 
      : 
      (<div 
        className="placeholder-photo"
        onClick={() => widgetRef.current.open()} 
        data-theme="call-to-action"><BsFillCameraFill /></div>)
      }
      </div>
  )
}

export default UploadWidget