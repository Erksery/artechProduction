import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { setSearchFile } from '@store/slices/files'

import { AppDispatch } from '../store'

export const useActiveFile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectActiveFile = useCallback((id: string | undefined) => {
    try {
      dispatch(setSearchFile(id))
    } catch (err) {
      console.log(err)
    }
  }, [])

  return { selectActiveFile }
}
