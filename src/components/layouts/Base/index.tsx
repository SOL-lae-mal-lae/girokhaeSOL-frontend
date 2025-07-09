import { FC, PropsWithChildren } from 'react';

export const Base: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col gap-16 items-center justify-center h-full w-full lg:w-[1200px] md:w-[800px] sm:w-[600px] mx-auto">
			{children}
		</div>
	);
};
