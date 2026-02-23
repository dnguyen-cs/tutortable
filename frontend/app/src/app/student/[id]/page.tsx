'use client';

import Header from '@/components/student-details/StudentDetailsHeader';
import MasteryHistory from '@/components/student-details/MasteryHistory';
import MasteryScoreRow from '@/components/MasteryScoreRow';
import { TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { Student } from '@/types/student';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function StudentDashboard({ params }: { params: Promise<{ id: string }> }) {
	const [student, setStudent] = useState<Student | null>(null);
	const [error, setError] = useState<string | null>(null);

	const { id } = use(params);

	useEffect(() => {
		const fetchStudent = async () => {
			try {
				const res = await fetch(`${apiURL}/students/${id}`);
				if (!res.ok) throw new Error('Failed to fetch student');
				const data = await res.json();
				setStudent(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
			}
		};
		fetchStudent();
	}, [id]);

	if (error) return <div className='container text-error'>Error: {error}</div>;
	if (!student) return <div className='container text-text-secondary'>Loading...</div>;

	return (
		<div className='flex h-full overflow-hidden animate-fade-in'>
			<main className='flex-1 max-w-7xl mx-auto p-4 md:p-10 space-y-10'>
				<Header student={student} />
				<MasteryHistory student={student} />
				<div className='grid grid-cols-3 gap-8'>
					{/* EXAM RESULTS */}
					<RecentPerformance student={student} />

					{/* SESSIONS */}
					<RecentSessions studentId={student.id} />
				</div>
			</main>
		</div>
	);
}

function RecentPerformance({ student }: { student: Student }) {
	return (
		<div className='bg-card rounded-4xl border border-border p-6 shadow-sm'>
			<h3 className='text-sm font-bold text-text-secondary uppercase mb-4 flex items-center gap-2'>
				<TrendingUp
					size={16}
					className='text-primary'
				/>
				Recent Performance
			</h3>
			{Object.entries(student.mastery_history)
				.map(([subject, dates]) => {
					const latestDate = Object.keys(dates).sort().at(-1);
					if (!latestDate) return null;
					return { subject, score: dates[latestDate], date: latestDate };
				})
				.filter(Boolean)
				.sort((a, b) => b!.date.localeCompare(a!.date))
				.slice(0, 3)
				.map((entry) => (
					<MasteryScoreRow
						key={entry!.subject}
						subject={entry!.subject}
						score={entry!.score}
					/>
				))}
		</div>
	);
}

// TODO Implement real data
function RecentSessions({ studentId }: { studentId: number }) {
	return null;
	return (
		<div className='bg-primary/5 rounded-4xl border border-primary/10 p-6 flex-1'>
			<h3 className='text-sm font-bold text-primary uppercase mb-4 flex items-center gap-2'>
				<Clock size={16} /> Recent Sessions
			</h3>
			<div className='space-y-4'>
				<SessionItem
					date='Oct 24'
					topic='Advanced Decimals'
				/>
				<SessionItem
					date='Oct 21'
					topic='Intro to Volume'
				/>
				<button className='w-full py-3 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors'>
					View Full History{' '}
					<ChevronRight
						size={14}
						className='inline ml-1'
					/>
				</button>
			</div>
		</div>
	);
}

function SessionItem({ date, topic }: { date: string; topic: string }) {
	return (
		<div className='flex gap-4'>
			<div className='text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded h-fit'>{date}</div>
			<div className='text-sm font-semibold text-text-primary'>{topic}</div>
		</div>
	);
}
