import axios from "axios"
import { User } from "../types"
import { httpService } from "./http.service"
export const userService = {
   signin,
   signup,
   logout
}

function signup(dto: User){
    return httpService.post('auth/signup', dto)
}

function signin(dto: {email: string, password: string}) {
    try {
        // throw new Error('aaaa')
        return httpService.post('auth/signin', dto)
    } catch (err){
        throw err
    }
}

function logout(){
    return httpService.post('auth/logout', null)
}

// async function getImages(){
//     return httpService.get('image', null)
// }

// function addImage(url:string){
//     return httpService.post('image', {url})
// }

// function removeImage(id:string){
//     return httpService.delete('image/' + id, {})
// }

// function makeImage(url:string){
//     return {
//         _id:utilService.makeId(),
//         url
//     }
// }

// async function validateURL(url:string):Promise<boolean>{
//     try{
//         await axios.get(url)
//         return true
//     } catch(e){
//         throw new Error('Could not add image: Invalid url')
//     }
// }