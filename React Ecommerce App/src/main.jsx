import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import Products from './Products.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <Products/>
    </ChakraProvider>
  </React.StrictMode>,
)
