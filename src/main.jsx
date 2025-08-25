import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MeetupDetails from './Pages/MeetupDetails.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
},{
  path: "/meetup/:meetupTitle",
  element: <MeetupDetails/>
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
