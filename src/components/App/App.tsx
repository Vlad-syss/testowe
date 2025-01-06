import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { Filter } from 'lucide-react'

import { useModal } from '@/hooks'
import { ContinueModal, FilterModal } from '@components/modals'
import { RootState } from '@store/store'

export const App: React.FC = () => {
	const { t } = useTranslation()
	const {
		isOpen: isFirstModalOpen,
		openModal: openFirstModal,
		closeModal: closeFirstModal
	} = useModal()
	const {
		isOpen: isSecondModalOpen,
		openModal: openSecondModal,
		closeModal: closeSecondModal
	} = useModal()
	const [confirmedFilters, setConfirmedFilters] = useState<{
		[key: string]: string[]
	} | null>(null)

	const selectedFilters = useSelector(
		(state: RootState) => state.filter.selectedFilters
	)

	useEffect(() => {
		setConfirmedFilters(selectedFilters)
	}, [selectedFilters])

	const handleContinue = () => {
		closeFirstModal()
		openSecondModal()
	}

	const handleConfirm = () => {
		setConfirmedFilters(selectedFilters)
		closeSecondModal()
	}

	return (
		<Center
			mx="auto"
			minH="100dvh"
			bg="teal.100"
			px={10}
		>
			<Flex
				display="flex"
				flexDirection="column"
				gap={2}
			>
				<Button
					variant="solid"
					rounded="sm"
					colorScheme="orange"
					color="white"
					gap={3}
					size="lg"
					width="2xl"
					shadow="lg"
					onClick={openFirstModal}
				>
					<Filter />
					{t('openFilters')}
				</Button>

				<FilterModal
					isOpen={isFirstModalOpen}
					onClose={closeFirstModal}
					onContinue={handleContinue}
				/>
				<ContinueModal
					isOpen={isSecondModalOpen}
					onClose={closeSecondModal}
					onContinue={handleConfirm}
					title={t('applyNewFilter')}
					applyButtonText={t('applyNewFilters')}
					closeButtonText={t('useOldFilter')}
				/>

				{confirmedFilters && (
					<Box
						mt={5}
						p={5}
						bg="white"
						boxShadow="md"
						borderRadius="md"
					>
						<pre>{JSON.stringify(confirmedFilters, null, 2)}</pre>
					</Box>
				)}
			</Flex>
		</Center>
	)
}
