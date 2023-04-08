import { httpService } from "./http.service"
import { SignupDto, UpdateUserDto } from "../dto"
export const userService = {
   signin,
   signup,
   updateUser,
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

function updateUser(dto: UpdateUserDto){
    return httpService.patch(`users/${dto.id}`, dto)
}
