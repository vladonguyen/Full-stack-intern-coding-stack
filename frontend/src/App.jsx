import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './components/RootLayout';
import Home, { loader as allNotesloader } from './components/Home';
import { action } from './components/FormCreateEdit';
import Create from './components/Create';
import NoteDetails, { loader as noteDetailsloader } from './components/NoteDetails';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [{
        index: true,
        element: <Home />,
        loader: allNotesloader
      },
      {
        path: "/create",
        element: <Create />,
        action: action
      },
      {
        path: ":id",
        element: <NoteDetails />,
        loader: noteDetailsloader
      }
    ]
    }
  ])

  return (
    <RouterProvider router={router}>
      <RootLayout />
    </RouterProvider>
  )
}

export default App
