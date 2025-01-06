import { FC } from 'react'

import { Box, Checkbox, Grid, GridItem, Text } from '@chakra-ui/react'

import { FilterItem } from '@api/types/Filter'

interface FilterBodyModalProps {
	filters: FilterItem[]
	selectedFilters: { [key: string]: string[] }
	handleFilterChange: (filterId: string, optionId: string) => void
}

export const FilterBodyModal: FC<FilterBodyModalProps> = ({
	filters,
	selectedFilters,
	handleFilterChange
}) => {
	return (
		<>
			{filters.map(filter => (
				<Box
					key={filter.id}
					borderBottomWidth="2px"
					borderColor={'gray.400'}
					p={4}
					mb={4}
				>
					<Text fontSize={'2xl'}>
						<strong>{filter.name}</strong>
					</Text>
					<Grid
						templateColumns="repeat(3, 1fr)"
						gap={3}
						mt={3}
						mb={3}
					>
						{filter.options.map(option => (
							<GridItem key={option.id}>
								<Checkbox
									size={'lg'}
									borderColor={'black'}
									isChecked={selectedFilters[filter.id]?.includes(option.id)}
									onChange={() => handleFilterChange(filter.id, option.id)}
								>
									{option.name}
								</Checkbox>
							</GridItem>
						))}
					</Grid>
				</Box>
			))}
		</>
	)
}
