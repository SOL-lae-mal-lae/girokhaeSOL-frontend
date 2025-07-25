import { FC } from 'react';

import Link from 'next/link';

import { AlertCircle, RefreshCw } from 'lucide-react';

import { Button } from '../ui/button';

interface Props {
	refetchSummary: () => void;
}

const SummaryError: FC<Props> = ({ refetchSummary }) => {
	return (
		<div className="flex flex-col justify-center items-center h-full gap-6 p-8">
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
					<AlertCircle className="w-8 h-8 text-red-600" />
				</div>
				<div className="space-y-2">
					<h2 className="text-xl font-semibold text-gray-900">
						데이터를 불러올 수 없습니다
					</h2>
					<p className="text-gray-600 max-w-md">
						계좌 정보를 확인할 수 없습니다. 계좌가 연동되어 있는지 확인해주세요.
					</p>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row gap-3">
				<Button
					onClick={() => refetchSummary()}
					variant="outline"
					className="flex items-center gap-2 cursor-pointer"
				>
					<RefreshCw className="w-4 h-4" />
					다시 시도
				</Button>
				<Link href="/account">
					<Button className="bg-brand-shinhan-blue text-white hover:bg-brand-navy-blue cursor-pointer">
						계좌 연동하기
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default SummaryError;
