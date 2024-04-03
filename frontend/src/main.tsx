// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/AppContext.tsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0    // if the query fails do not reply.
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </>,
)

// queryClient is used to caching, fetching and updating data.
