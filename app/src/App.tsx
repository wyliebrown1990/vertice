import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { ContractBenchmark } from './pages/contract/ContractBenchmark'
import { ContractDocuments } from './pages/contract/ContractDocuments'
import { Documents } from './pages/Documents'
import { DynamicIntake } from './pages/intake/DynamicIntake'
import { SlackIntake } from './pages/intake/SlackIntake'
import { Analytics } from './pages/insights/Analytics'
import { ProcurementInsights } from './pages/insights/ProcurementInsights'
import { Usage } from './pages/insights/Usage'
import { Templates, WorkflowEditor, WorkflowList } from './pages/workflows/Workflows'
import { RfpBuilder } from './pages/sourcing/RfpBuilder'
import { AiSpend } from './pages/insights/AiSpend'
import { Cloud } from './pages/cloud/Cloud'
import { Budgets, Catalog, InvoiceReview, Invoices, Offers, Orders, PurchaseOrders, Savings } from './pages/p2p/P2P'
import { ExpertEngage, VendorDirectory, VendorRecord } from './pages/vendors/Vendors'
import { ContractLayout } from './pages/contract/ContractLayout'
import { ContractOutcomes } from './pages/contract/ContractOutcomes'
import { ContractOverview } from './pages/contract/ContractOverview'
import { Contracts } from './pages/Contracts'
import { Dashboard } from './pages/Dashboard'
import { OutsideDemo } from './pages/OutsideDemo'
import { RequestRouter } from './pages/requests/RequestRouter'
import { Settings } from './pages/settings/Settings'
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
      { path: 'intelligent-workflows/requests/:id/:tab', element: <RequestRouter /> },
      { path: 'contracts', element: <Contracts /> },
      {
        path: 'contracts/:id',
        element: <ContractLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: 'overview', element: <ContractOverview /> },
          { path: 'benchmark', element: <ContractBenchmark /> },
          { path: 'documents', element: <ContractDocuments /> },
          { path: 'outcomes', element: <ContractOutcomes /> },
        ],
      },
      { path: 'documents', element: <Documents /> },
      { path: 'intake/slack', element: <SlackIntake /> },
      { path: 'intake/new', element: <DynamicIntake /> },
      { path: 'sourcing/rfp', element: <RfpBuilder /> },
      { path: 'offers', element: <Offers /> },
      { path: 'catalog', element: <Catalog /> },
      { path: 'purchase-orders', element: <PurchaseOrders /> },
      { path: 'orders', element: <Orders /> },
      { path: 'invoices', element: <Invoices /> },
      { path: 'invoices/:id', element: <InvoiceReview /> },
      { path: 'savings', element: <Savings /> },
      { path: 'analytics', element: <Navigate to="/analytics/spend-insights" replace /> },
      { path: 'analytics/:tab', element: <Analytics /> },
      { path: 'insights/procurement', element: <ProcurementInsights /> },
      { path: 'insights/usage', element: <Usage /> },
      { path: 'insights/budgets', element: <Budgets /> },
      { path: 'insights/ai-spend', element: <AiSpend /> },
      { path: 'vendors', element: <VendorDirectory /> },
      { path: 'vendors/:id', element: <VendorRecord /> },
      { path: 'expert-engage', element: <ExpertEngage /> },
      { path: 'workflows', element: <WorkflowList /> },
      { path: 'workflows/templates', element: <Templates /> },
      { path: 'workflows/edit/:id', element: <WorkflowEditor /> },
      { path: 'cloud', element: <Navigate to="/cloud/overview" replace /> },
      { path: 'cloud/:tab', element: <Cloud /> },
      { path: 'settings', element: <Navigate to="/settings/integrations" replace /> },
      { path: 'settings/:tab', element: <Settings /> },
      { path: 'outside/:slug', element: <OutsideDemo /> },
      { path: '*', element: <OutsideDemo missing /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
