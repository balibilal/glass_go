import RequireAuth from './components/layout/requireAuth.js';
import Rootlayout from './components/layout/Rootlayout.js';
import Addjobs from './pages/addjobs/addjobs.jsx';
import Assignjob from './pages/assignjob/assignjob.jsx';
import Login from './pages/login/login.jsx';
import Addriders from './pages/riders/addriders.jsx';
import Riders from './pages/riders/riders.jsx';


import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";




function App() {

  


  const router = createBrowserRouter(
    createRoutesFromElements(

      <Route path='/' element={<Rootlayout />}>

        <Route path="*" element={<Navigate to="/" />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/assign-job" element={<Assignjob />} />
        <Route exact path="/add-riders" element={<Addriders />} />
        <Route exact path="/riders" element={<Riders />} />




        <Route element={<RequireAuth />}>
          <Route exact path="/add-job" element={<Addjobs />} />
        </Route>
      </Route>
    ),
    {
      future: {
        v7_relativeSplatPath: true, // Enable the v7 behavior for splat routes
        v7_fetcherPersist: true,    // Enable fetcher persistence behavior changes
        v7_skipActionErrorRevalidation: true, // Skip revalidation on action errors
        v7_partialHydration: true, // Enable partial hydration
        v7_normalizeFormMethod: true, // Normalize form method
        v7_startTransition: true,  // Enable startTransitio
    
      },
    }
  );






  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
