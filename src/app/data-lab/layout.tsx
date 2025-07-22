// layout.tsx
export default function MyPageLayout({ children }) {
	return (
		<div className="w-full max-w-7xl mx-auto px-8 flex flex-col gap-8 mt-8">
			{/* 공통 레이아웃(예: 배경, wrapper 등) */}
			{children}
		</div>
	);
}
