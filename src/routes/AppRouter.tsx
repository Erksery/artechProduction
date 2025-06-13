import { Route, Routes } from 'react-router-dom'

import { AdminPanel } from '../pages/Admin/AdminPanel'
import { Folder } from '../pages/Folder/Folder'
import { PublicFolder } from '../pages/Folder/PublicFolder'
import { Home } from '../pages/Home/Home'
import { Sign } from '../pages/Registration/Sign'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/sign'
        element={<Sign />}
      />

      <Route
        path='/folder/:id'
        element={<Folder />}>
        <Route
          path='file/:fileId'
          element={<Folder />}
        />
      </Route>
      <Route
        path='/shared/folder/:id'
        element={<PublicFolder />}
      />
      <Route
        path='/admin'
        element={<AdminPanel />}
      />
    </Routes>
  )
}
