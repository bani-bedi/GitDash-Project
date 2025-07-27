
import './App.css'
import Repodetails from './Components/Repodetails';
import UserRepository from './Components/UserRepository';
import UserSearch from './Components/UserSearch'
import ErrorBoundary from './pages/ErrorBoundary';
import { Userpage } from './pages/Userpage'





import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Userpage/>
  },
  {
    path:'/repo',
    element:<UserRepository/>
  },
  {
    path:'/details',
    element:<Repodetails/>
  }
])

function App() {

  


  return (
    <div className='App'>
      <ErrorBoundary>

          <RouterProvider router={router} />
      </ErrorBoundary>
    </div>

  )
}

export default App
