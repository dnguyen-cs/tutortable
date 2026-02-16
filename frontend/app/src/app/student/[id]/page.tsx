'use client';

import Header from './components/header';
import MasteryHistory from './components/masteryhistory';
import MasteryScoreRow from '../../../../ui/MasteryScoreRow';
import { TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { use } from 'react';

export default function StudentDashboard({ params }: { params: Promise<{ id: number }> }) {
	const { id } = use(params);

	return (
		<div className='flex text-foreground'>
			<main className='container'>
				<Header />
				<MasteryHistory />
				<div className='grid grid-cols-3 gap-8'>
					{/* EXAM RESULTS */}
					<div className='bg-card rounded-4xl border border-border p-6 shadow-sm'>
						<h3 className='text-sm font-bold text-text-secondary uppercase mb-4 flex items-center gap-2'>
							<TrendingUp
								size={16}
								className='text-primary'
							/>
							Recent Performance
						</h3>

						<MasteryScoreRow
							subject='Decimals'
							score={95}
							className='mb-4'
						/>
						<MasteryScoreRow
							subject='Fractions'
							score={80}
						/>
						<MasteryScoreRow
							subject='Adding'
							score={91}
						/>
					</div>

					{/* UPCOMING SESSIONS */}
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
				</div>
			</main>
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
