'use client';

import { useEffect } from 'react';

import { UserDetailDialog } from '@/components/dialogs';
import { useDialog } from '@/hooks/useDialog';

const HomeDialogClient = () => {
	const { setOpen, setDialogTitle, setDialogDescription, setDialogBody } =
		useDialog();

	const handleOpenDialog = () => {
		setOpen(false);
	};

	useEffect(() => {
		setDialogTitle('정보 입력');
		setDialogDescription(
			'정확한 데이터랩 정보 제공을 위해 나이와 성별 정보가 필요합니다.'
		);
		setDialogBody(<UserDetailDialog onClose={handleOpenDialog} />);
		setOpen(true);
	}, []);

	return null;
};

export default HomeDialogClient;
