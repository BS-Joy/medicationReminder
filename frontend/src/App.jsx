import Layout from "./components/layouts/Layout"
import CreateSchedule from "./components/schedule/CreateSchedule"
import CreateMedication from "./components/medication/CreateMedication"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./components/pages/Home"
import SignUp from "./components/pages/SignUp"
import LogIn from "./components/pages/LogIn"
import Profile from "./components/pages/Profile"
import PrivateRoute from "./components/routes/PrivateRoute"
import PublicRoute from "./components/routes/PublicRoute"
import AdminRoute from "./components/routes/AdminRoute"
import AdminLayout from "./components/admin/layout/AdminLayout"
import DashBoard from "./components/admin/dashboard/DashBoard"
import UserList from "./components/admin/users/UserList"
import MedicationLists from "./components/admin/medications/MedicationLists"
import ScheduleList from "./components/admin/schedules/ScheduleList"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/signup',
          element: <PublicRoute><SignUp /></PublicRoute>
        },
        {
          path: '/login',
          element: <PublicRoute><LogIn /></PublicRoute>
        },
        {
          path: '/',
          element: <PrivateRoute><Home /></PrivateRoute>
        },
        {
          path: '/medication',
          element: <PrivateRoute><CreateMedication /></PrivateRoute>
        },
        {
          path: '/schedule',
          element: <PrivateRoute><CreateSchedule /></PrivateRoute>
        },
        {
          path: '/profile',
          element: <PrivateRoute><Profile /></PrivateRoute>
        },
        // admin routes
        {
          path: '/admin',
          element: <AdminRoute><AdminLayout /></AdminRoute>,
          children: [
            {
              path: '/admin',
              element: <AdminRoute><DashBoard /></AdminRoute>
            },
            {
              path: '/admin/users',
              element: <AdminRoute><UserList /></AdminRoute>
            },
            {
              path: '/admin/medications',
              element: <AdminRoute><MedicationLists /></AdminRoute>
            },
            {
              path: '/admin/schedules',
              element: <AdminRoute><ScheduleList /></AdminRoute>
            },
          ]
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
