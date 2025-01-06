import { FilterChooseOption, FilterType } from '../Filter'

export interface SearchRequestFilterBase {
	id: string
	type: FilterType
	name: string // CHANGED
}

export interface SearchRequestOptions extends SearchRequestFilterBase {
	type: FilterType.OPTION
	options: FilterChooseOption[] // CHANGED
}

export type SearchRequestFilter = SearchRequestOptions[]
