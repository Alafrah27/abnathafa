// main.jsx or index.js
import { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import LoadingPage from './component/LazyPage.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

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
    <HelmetProvider>

      <QueryClientProvider client={queryClient}>

        <BrowserRouter>
          <Suspense fallback={<LoadingPage />}>
            <ErrorBoundary fallback={<div>something went wrong</div>}>

              <LazyApp />
            </ErrorBoundary>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </>,
)
