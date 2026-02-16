'use client';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const MOCK_DATA = {
	'Jan 2026': { Decimals: 60 },
	'Feb 2026': { Decimals: 65 },
	'Mar 2026': { Fractions: 78, Decimals: 70 },
	'Apr 2026': { Fractions: 85, Decimals: 72 },
	'May 2026': { Fractions: 90, Decimals: 80 },
	'Jun 2026': { Fractions: 88, Decimals: 78 },
	'Jul 2026': { Fractions: 92, Decimals: 82 },
	'Aug 2026': { Fractions: 95, Decimals: 85 },
	'Sep 2026': { Fractions: 94, Decimals: 88 },
	'Oct 2026': { Fractions: 96, Decimals: 90 },
	'Nov 2026': { Fractions: 98, Decimals: 92 },
	'Dec 2026': { Fractions: 97, Decimals: 91 },
};

const MOCK_MASTERY_SCORES = Object.entries(MOCK_DATA).map(
	([month, scores]) => ({ month, ...scores }),
);

const dataKeys = Array.from(
	new Set(
		MOCK_MASTERY_SCORES.flatMap((obj) =>
			Object.keys(obj).filter((key) => key !== 'month'),
		),
	),
);

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function MasteryHistory() {
	return (
		<div className='container h-120'>
			<ResponsiveContainer width='100%' height='100%'>
				<LineChart
					data={MOCK_MASTERY_SCORES}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<Legend align='right' verticalAlign='top' />
					<XAxis dataKey={`month`} />
					<YAxis
						width='auto'
						domain={[0, 100]}
						label={{
							value: 'Scores',
							position: 'insideLeft',
							angle: -90,
						}}
					/>
					<Tooltip />
					{dataKeys.map((key, index) => (
						<Line
							key={key}
							type='monotone'
							dataKey={key}
							stroke={COLORS[index % COLORS.length]}
							strokeWidth={2}
							activeDot={{ r: 8 }}
							connectNulls
						/>
					))}
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
