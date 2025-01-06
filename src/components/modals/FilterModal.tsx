import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Center,
	Button as ChakraButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

import { useGetFilters } from '@/hooks'
import { setFilters } from '@store/slices/filterSlice'

import { FilterBodyModal } from './_components/FilterBodyModal'
import { useFilterModal } from './_components/useFilterModal'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
	onContinue: () => void
}

export const FilterModal: React.FC<FilterModalProps> = ({
	isOpen,
	onClose,
	onContinue
}) => {
	const { t } = useTranslation()
	const {
		dispatch,
		filters,
		handleFilterChange,
		selectedFilters,
		handleClearAllFilters
	} = useFilterModal()
	const { data, isLoading, error } = useGetFilters()

	useEffect(() => {
		if (data) {
			dispatch(setFilters(data))
		}
	}, [data, dispatch])

	if (isLoading) {
		return <div>{t('loading')}</div>
	}
	if (error) {
		return (
			<div>
				{t('error')}: {error.message}
			</div>
		)
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={'6xl'}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader
					borderBottomWidth="1px"
					mx={10}
					borderColor={'gray.400'}
					fontSize={'4xl'}
				>
					<Center>{t('filters')}</Center>
				</ModalHeader>
				<ModalCloseButton size={'lg'} />
				<ModalBody>
					<FilterBodyModal
						filters={filters}
						selectedFilters={selectedFilters}
						handleFilterChange={handleFilterChange}
					/>
				</ModalBody>
				<Center>
					<ModalFooter my={3}>
						<ChakraButton
							colorScheme="orange"
							width={['full', '250px']}
							rounded={'2xl'}
							size={'lg'}
							onClick={onContinue}
						>
							{t('applyNewFilters')}
						</ChakraButton>
						<ChakraButton
							variant="link"
							colorScheme="blue"
							position={'absolute'}
							right={7}
							onClick={handleClearAllFilters}
						>
							{t('clearAllParameters')}
						</ChakraButton>
					</ModalFooter>
				</Center>
			</ModalContent>
		</Modal>
	)
}

export default FilterModal
