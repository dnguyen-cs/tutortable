'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Student } from '@/types/student';

function getColor(index: number, total: number) {
	const hue = Math.round((index / total) * 360);
	return `hsl(${hue}, 70%, 55%)`;
}

function buildChartData(student: Student) {
	const masteryHistory = student.mastery_history;
	const dateMap: Record<string, Record<string, number>> = {};

	Object.entries(masteryHistory).forEach(([subject, dates]) => {
		Object.entries(dates).forEach(([dateStr, score]) => {
			if (!dateMap[dateStr]) dateMap[dateStr] = {};
			dateMap[dateStr][subject] = score;
		});
	});

	const sortedDates = Object.keys(dateMap).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

	return sortedDates.map((dateStr) => ({
		date: dateStr,
		...dateMap[dateStr],
	}));
}

function getMonthTicks(dates: string[]): string[] {
	const seen = new Set<string>();
	return dates.filter((dateStr) => {
		const key = dateStr.slice(0, 7);
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

function formatMonthTick(dateStr: string) {
	return new Date(dateStr).toLocaleString('default', { month: 'short', year: 'numeric' });
}

export default function MasteryHistory({ student }: { student: Student }) {
	const chartData = buildChartData(student);
	const dataKeys = Array.from(new Set(chartData.flatMap((obj) => Object.keys(obj).filter((key) => key !== 'date'))));
	const dates = chartData.map((d) => d.date as string);
	const monthTicks = getMonthTicks(dates);

	return (
		<div className='container h-120'>
			<ResponsiveContainer
				width='100%'
				height='100%'>
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<Legend
						align='right'
						verticalAlign='top'
					/>
					<XAxis
						dataKey='date'
						ticks={monthTicks}
						tickFormatter={formatMonthTick}
					/>
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
							stroke={getColor(index, dataKeys.length)}
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
