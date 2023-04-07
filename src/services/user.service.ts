import { httpService } from "./http.service"
import { SignupDto } from "../dto"
export const userService = {
   signin,
   signup,
   logout
}

function signup(dto: SignupDto){
    return httpService.post('auth/signup', dto)
}

function signin(dto: {email: string, password: string}) {
    try {
        return httpService.post('auth/signin', dto)
    } catch (err){
        throw err
    }
}

function logout(){
    return httpService.post('auth/logout', null)
}
