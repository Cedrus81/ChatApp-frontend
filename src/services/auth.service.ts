import axios from "axios"
import { httpService } from "./http.service"
export const imageService = {
    validateURL,
    // makeImage,
    getImages,
    addImage,
    removeImage
}

async function getImages(){
    return httpService.get('image', null)
}

function addImage(url:string){
    return httpService.post('image', {url})
}

function removeImage(id:string){
    return httpService.delete('image/' + id, {})
}

// function makeImage(url:string){
//     return {
//         _id:utilService.makeId(),
//         url
//     }
// }

async function validateURL(url:string):Promise<boolean>{
    try{
        await axios.get(url)
        return true
    } catch(e){
        throw new Error('Could not add image: Invalid url')
    }
}