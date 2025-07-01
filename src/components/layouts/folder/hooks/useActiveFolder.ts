import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@store/index'
import { setActiveFolder } from '@store/slices/folders'

export const useActiveFolder = (id: string | undefined) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (id) {
      dispatch(setActiveFolder(id))
    }
  }, [id, dispatch])
}
