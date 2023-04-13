
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { redirect, useNavigate, useOutletContext } from 'react-router-dom'
import { ContextType, User } from './types'
import { clearUser } from './store/slices/userSlice'
import { useContext, useEffect } from 'react'



// REDUX TOOLKIT HOOKS:
// Use throughout your app instead of plain `useDispatch` and `useSelector`

// For useDispatch, the default Dispatch type does not know about thunks.
export const useAppDispatch: () => AppDispatch = useDispatch

// For useSelector, it saves you the need to type (state: RootState) every time
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// REACT ROUTER HOOKS:
// recommended by the devs to use a custom hook for typescript users
// my addition: now also checks if the session is over, and does not return null anymore
export function useUserSession() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useOutletContext<ContextType>().user
    useEffect(()=>{
        if (!document.cookie.includes('jwt=') || !user){
            if(user) dispatch(clearUser())
            navigate('/')
        }
    }, [user])
    return user;
}

export function useHasExpired() {
    return !document.cookie.includes('jwt=')
}
