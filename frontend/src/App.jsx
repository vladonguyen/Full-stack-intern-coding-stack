import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from './components/RootLayout';

function App() {
const router = createBrowserRouter([
  {path:"/",
    element: <RootLayout />,
    children: []
  }
])

  return (
 <RouterProvider router={router}>
  
 </RouterProvider>
  )
}

export default App
