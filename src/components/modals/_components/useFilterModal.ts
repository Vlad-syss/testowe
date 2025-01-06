import { useDispatch, useSelector } from 'react-redux'

import { clearAllFilters, setSelectedFilters } from '@store/slices/filterSlice'
import { RootState } from '@store/store'

export const useFilterModal = () => {
	const dispatch = useDispatch()
	const selectedFilters = useSelector(
		(state: RootState) => state.filter.selectedFilters
	)
	const filters = useSelector((state: RootState) => state.filter.filters)

	const handleFilterChange = (filterId: string, optionId: string) => {
		const updatedSelectedFilters = selectedFilters[filterId] || []
		if (updatedSelectedFilters.includes(optionId)) {
			dispatch(
				setSelectedFilters({
					id: filterId,
					options: updatedSelectedFilters.filter(id => id !== optionId)
				})
			)
		} else {
			dispatch(
				setSelectedFilters({
					id: filterId,
					options: [...updatedSelectedFilters, optionId]
				})
			)
		}
	}

	const handleClearAllFilters = () => {
		dispatch(clearAllFilters())
	}
	return {
		dispatch,
		selectedFilters,
		filters,
		handleFilterChange,
		handleClearAllFilters
	}
}
