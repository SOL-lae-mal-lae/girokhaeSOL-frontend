'use client';

import { createContext, useState } from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

type DialogContextType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	dialogTitle: string;
	setDialogTitle: (title: string) => void;
	dialogDescription: string;
	setDialogDescription: (description: string) => void;
	dialogBody: React.ReactNode | null;
	setDialogBody: (body: React.ReactNode) => void;
};

export const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [dialogTitle, setDialogTitle] = useState<string>('');
	const [dialogDescription, setDialogDescription] = useState<string>('');
	const [dialogBody, setDialogBody] = useState<React.ReactNode | null>(null);

	return (
		<DialogContext.Provider
			value={{
				open,
				setOpen,
				dialogTitle,
				setDialogTitle,
				dialogDescription,
				setDialogDescription,
				dialogBody,
				setDialogBody,
			}}
		>
			{children}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{dialogTitle}</DialogTitle>
						<DialogDescription>{dialogDescription}</DialogDescription>
					</DialogHeader>
					{dialogBody}
				</DialogContent>
			</Dialog>
		</DialogContext.Provider>
	);
};
