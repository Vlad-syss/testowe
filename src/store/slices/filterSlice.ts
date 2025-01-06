import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { SearchRequestOptions } from '@api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	filters: SearchRequestOptions[]
	selectedFilters: { [key: string]: string[] }
}

const initialState: FilterState = {
	filters: [],
	selectedFilters: {}
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<SearchRequestOptions[]>) => {
			state.filters = action.payload
		},
		setSelectedFilters: (
			state,
			action: PayloadAction<{ id: string; options: string[] }>
		) => {
			state.selectedFilters[action.payload.id] = action.payload.options
		},
		clearAllFilters: state => {
			state.selectedFilters = {}
		}
	}
})

export const { setFilters, setSelectedFilters, clearAllFilters } =
	filterSlice.actions
export default filterSlice.reducer
