import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ContractBenchmark } from './pages/contract/ContractBenchmark'
import { ContractLayout } from './pages/contract/ContractLayout'
import { ContractOutcomes } from './pages/contract/ContractOutcomes'
import { ContractOverview } from './pages/contract/ContractOverview'
import { Contracts } from './pages/Contracts'
import { Dashboard } from './pages/Dashboard'
import { OutsideDemo } from './pages/OutsideDemo'
import { RequestPage } from './pages/RequestPage'
import { RequestsList, TasksList } from './pages/WorkLists'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'tasks', element: <TasksList /> },
      { path: 'intelligent-workflows/requests', element: <RequestsList /> },
      { path: 'intelligent-workflows/requests/:id', element: <Navigate to="overview" replace /> },
      { path: 'intelligent-workflows/requests/:id/overview', element: <RequestPage /> },
      { path: 'contracts', element: <Contracts /> },
      {
        path: 'contracts/:id',
        element: <ContractLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: 'overview', element: <ContractOverview /> },
          { path: 'benchmark', element: <ContractBenchmark /> },
          { path: 'outcomes', element: <ContractOutcomes /> },
        ],
      },
      { path: 'outside/:slug', element: <OutsideDemo /> },
      { path: '*', element: <OutsideDemo missing /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
