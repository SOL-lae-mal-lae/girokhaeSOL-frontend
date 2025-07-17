'use client';

import { useContext } from 'react';

import { CreateTradeLogContext } from './CreateTradeLogContext';

export const useCreateTradeLog = () => {
	const context = useContext(CreateTradeLogContext);

	if (!context) {
		throw new Error(
			'useCreateTradeLog must be used within a CreateTradeLogProvider'
		);
	}

	return context;
};
