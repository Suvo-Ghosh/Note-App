import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Paste from './component/Paste'
import ViewPaste from './component/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div>
          <Navbar></Navbar>
          <Home></Home>
        </div>
    },
    {
      path: "/paste",
      element:
        <div>
          <Navbar></Navbar>
          <Paste></Paste>
        </div>
    },
    {
      path: "/paste/:id",
      element:
        <div>
          <Navbar></Navbar>
          <ViewPaste></ViewPaste>
        </div>
    },
  ]
)

function App() {

  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>
    </>
  )
}

export default App
