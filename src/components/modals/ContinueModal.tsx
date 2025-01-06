import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	Center,
	Button as ChakraButton,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

import { setSelectedFilters } from '@store/slices/filterSlice'
import { RootState } from '@store/store'

interface ContinueModalProps {
	isOpen: boolean
	onClose: () => void
	onContinue: () => void
	title: string
	applyButtonText?: string
	closeButtonText?: string
}

export const ContinueModal: FC<ContinueModalProps> = ({
	isOpen,
	onClose,
	onContinue,
	title,
	applyButtonText = 'Apply new filters',
	closeButtonText = 'Use old filter'
}) => {
	const dispatch = useDispatch()
	const filters = useSelector((state: RootState) => state.filter.filters)
	const handleClearFilters = () => {
		filters.forEach(filter => {
			dispatch(setSelectedFilters({ id: filter.id, options: [] }))
		})
	}
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size={'6xl'}
		>
			<ModalOverlay />
			<ModalContent mx={5}>
				<ModalHeader
					fontSize={'3xl'}
					mb={'24'}
				>
					<Center>{title}</Center>
				</ModalHeader>
				<ModalCloseButton size={'lg'} />
				<Center>
					<ModalFooter gap={4}>
						<ChakraButton
							variant="outline"
							rounded={'2xl'}
							width={['full', '250px']}
							size={'lg'}
							border={'2px'}
							borderColor={'gray'}
							onClick={handleClearFilters}
						>
							{closeButtonText}
						</ChakraButton>
						<ChakraButton
							colorScheme="orange"
							width={['full', '250px']}
							rounded={'2xl'}
							size={'lg'}
							onClick={onContinue}
						>
							{applyButtonText}
						</ChakraButton>
					</ModalFooter>
				</Center>
			</ModalContent>
		</Modal>
	)
}
