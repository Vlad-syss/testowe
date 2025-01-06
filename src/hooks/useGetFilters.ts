import { useQuery } from '@tanstack/react-query'

import { fetchFilters } from '@api/filter'
import { SearchRequestOptions } from '@api/types/SearchRequest/SearchRequestFilter'

export const useGetFilters = () => {
	return useQuery<SearchRequestOptions[]>({
		queryKey: ['filters'],
		queryFn: fetchFilters
	})
}
