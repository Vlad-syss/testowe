import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { App } from '@components/App'
import { queryClient } from '@constants'
import { ThemeProvider } from '@providers/ThemeProvider'
import { store } from '@store/store'

import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<ThemeProvider>
					<ChakraProvider>
						<App />
					</ChakraProvider>
				</ThemeProvider>
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>
)
