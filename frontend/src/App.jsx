import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from './components/RootLayout';
import Home, { loader as allNotesloader } from './components/Home';
import { action as formSubmit} from './components/FormCreateEdit';
import Create from './components/Create';
import NoteDetails, { loader as noteDetailsloader } from './components/NoteDetails';
import Edit from './components/Edit';


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
        action: formSubmit
      },
      {
        path: ":id",
        children: [
          {index: true,
            element: <NoteDetails />,
            loader: noteDetailsloader
          },

          {
            path:"edit",
            element:<Edit />,
            loader: noteDetailsloader,
            action: formSubmit
          }
        ]
      },
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
