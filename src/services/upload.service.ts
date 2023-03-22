export const uploadService = {
  uploadImg
}
function uploadImg(file: File) {

  // const file = _getFile(e)
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUD_PRESET
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', file)

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}



// function _getFile(files: FileList){
//   // return _isDragEvent(ev) ? ev.dataTransfer.files[0] : ev.target.files[0]
//   if (_isDragEvent(ev)) return ev.dataTransfer.files[0]
//   if (_isSubmitEvent(ev)) {
//     if (!ev.target.files) return {} as File
//     return ev.target.files[0]}
// }

// function _isDragEvent(ev: any): ev is DragEvent<HTMLElement>{
//   return ev.dataTransfer.files[0] in ev
// }

// function _isSubmitEvent(ev: any): ev is ChangeEvent<HTMLInputElement>{
//   return ev.target.files[0] in ev
// }