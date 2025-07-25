import { cn } from '@/lib/utils';

interface SpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-6 h-6',
		lg: 'w-8 h-8',
	};

	return (
		<div
			className={cn(
				'animate-spin rounded-full border-2 border-gray-200 border-t-brand-shinhan-blue',
				sizeClasses[size],
				className
			)}
		/>
	);
};

// 신한은행 브랜드에 맞는 고급스러운 스피너
export const ShinhanSpinner = ({ size = 'md', className }: SpinnerProps) => {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-6 h-6',
		lg: 'w-8 h-8',
	};

	return (
		<div className={cn('relative', sizeClasses[size], className)}>
			<div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
			<div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-shinhan-blue animate-spin"></div>
			<div className="absolute inset-1 rounded-full border border-gray-50"></div>
		</div>
	);
};

// 펄스 애니메이션 스피너
export const PulseSpinner = ({ size = 'md', className }: SpinnerProps) => {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-6 h-6',
		lg: 'w-8 h-8',
	};

	return (
		<div className={cn('relative', sizeClasses[size], className)}>
			<div className="absolute inset-0 bg-brand-shinhan-blue rounded-full animate-ping opacity-20"></div>
			<div className="absolute inset-0 bg-brand-shinhan-blue rounded-full"></div>
		</div>
	);
};

interface LoadingSpinnerProps {
	size?: 'sm' | 'md' | 'lg';
	text?: string;
	className?: string;
	variant?: 'default' | 'shinhan' | 'pulse';
}

export const LoadingSpinner = ({
	size = 'md',
	text = 'Loading...',
	className,
	variant = 'default',
}: LoadingSpinnerProps) => {
	const SpinnerComponent =
		variant === 'shinhan'
			? ShinhanSpinner
			: variant === 'pulse'
				? PulseSpinner
				: Spinner;

	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center gap-3',
				className
			)}
		>
			<SpinnerComponent size={size} />
			{text && <p className="text-sm text-gray-600 font-medium">{text}</p>}
		</div>
	);
};

interface PageSpinnerProps {
	text?: string;
	variant?: 'default' | 'shinhan' | 'pulse';
}

export const PageSpinner = ({
	text = 'Loading...',
	variant = 'shinhan',
}: PageSpinnerProps) => {
	return (
		<div className="flex w-full h-full items-center justify-center min-h-[400px]">
			<LoadingSpinner size="lg" text={text} variant={variant} />
		</div>
	);
};

// 인라인 스피너 (버튼 등에 사용)
export const InlineSpinner = ({ size = 'sm', className }: SpinnerProps) => {
	return (
		<ShinhanSpinner size={size} className={cn('inline-block', className)} />
	);
};
