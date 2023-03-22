
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'



// REDUX TOOLKIT HOOKS:
// Use throughout your app instead of plain `useDispatch` and `useSelector`

// For useDispatch, the default Dispatch type does not know about thunks.
export const useAppDispatch: () => AppDispatch = useDispatch

// For useSelector, it saves you the need to type (state: RootState) every time
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector