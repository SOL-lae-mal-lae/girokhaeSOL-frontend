import { FC, useMemo } from 'react';

import { Label, Pie, PieChart } from 'recharts';

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	score: {
		label: '점수',
	},
	emotion: {
		label: '감정 관리',
		color: 'var(--chart-1)',
	},
	strategy: {
		label: '매매 전략',
		color: 'var(--chart-2)',
	},
	company: {
		label: '기업 분석',
		color: 'var(--chart-3)',
	},
} satisfies ChartConfig;

interface Props {
	scores: number[];
}

const ScoreChart: FC<Props> = ({ scores }) => {
	const chartData = [
		{
			score: scores[0],
			factor: 'strategy',
			fill: 'var(--color-brand-shinhan-blue)',
		},
		{
			score: scores[1],
			factor: 'company',
			fill: 'var(--color-brand-sky-blue)',
		},
		{
			score: scores[2],
			factor: 'emotion',
			fill: 'var(--color-brand-light-blue)',
		},
	];

	const totalScore = useMemo(() => {
		return scores.reduce((acc, curr) => acc + curr, 0);
	}, []);

	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square max-h-[250px]"
		>
			<PieChart>
				<ChartTooltip
					cursor={true}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={chartData}
					dataKey="score"
					nameKey="factor"
					innerRadius={60}
					strokeWidth={5}
					labelLine={false}
					label={({ payload, ...props }) => {
						return (
							<text
								cx={props.cx}
								cy={props.cy}
								x={props.x}
								y={props.y}
								textAnchor={props.textAnchor}
								dominantBaseline={props.dominantBaseline}
								fill="hsla(var(--foreground))"
							>
								{payload.score}
							</text>
						);
					}}
				>
					<Label
						content={({ viewBox }) => {
							if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle"
									>
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-foreground text-3xl font-bold"
										>
											{totalScore.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-muted-foreground"
										>
											AI Score
										</tspan>
									</text>
								);
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	);
};

export default ScoreChart;
