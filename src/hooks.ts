
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { redirect, useNavigate, useOutletContext } from 'react-router-dom'
import { User } from './types'
import { clearUser } from './store/slices/userSlice'



// REDUX TOOLKIT HOOKS:
// Use throughout your app instead of plain `useDispatch` and `useSelector`

// For useDispatch, the default Dispatch type does not know about thunks.
export const useAppDispatch: () => AppDispatch = useDispatch

// For useSelector, it saves you the need to type (state: RootState) every time
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// REACT ROUTER HOOKS:
// recommended by the devs to use a custom hook for typescript users
// my addition: now also checks if the session is over, and does not return null anymore
type ContextType = { user: User | null };
export function useUser() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const hasSessionExpired = !document.cookie.includes('jwt=')
    const user = useOutletContext<ContextType>().user
    
    if(hasSessionExpired || !user){
        dispatch(clearUser())
        navigate('/')
        // throw new Error('Your session has expired...')
    }
    return user;
}
