import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/index'
import { setSearchFile } from '@store/slices/files'

export const useActiveFile = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectActiveFile = useCallback(
    (id: string | undefined) => {
      try {
        dispatch(setSearchFile(id))
      } catch (err) {
        console.log(err)
      }
    },
    [dispatch]
  )

  return { selectActiveFile }
}
