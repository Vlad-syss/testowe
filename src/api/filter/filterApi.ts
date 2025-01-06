import { SearchRequestOptions } from '@api/types/SearchRequest/SearchRequestFilter'

export const fetchFilters = async () => {
	const response = await fetch('./src/temp/filterData.json')
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}
	const data: { filterItems: SearchRequestOptions[] } = await response.json()
	return data.filterItems
}
