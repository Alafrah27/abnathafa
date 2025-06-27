// main.jsx or index.js
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import LoadingPage from './component/LazyPage.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from "react-error-boundary";
import Errors from './component/Errors.jsx'
const LazyApp = lazy(() => import('./App.jsx'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ErrorBoundary fallback={<Errors />}>

      <QueryClientProvider client={queryClient}>

        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <LazyApp />
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </>,
)
