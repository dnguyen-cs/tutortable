'use client';

import { ArrowUpAZ, ArrowDownAZ, ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import StudentRow from './StudentRow';
import { useStudents } from '@/hooks/StudentsContext';

function SortIcon({ active, dir, type }: { active: boolean; dir: 'asc' | 'desc'; type: 'name' | 'date' }) {
	if (!active)
		return (
			<ChevronsUpDown
				size={14}
				className='opacity-40'
			/>
		);
	if (type === 'name') return dir === 'asc' ? <ArrowUpAZ size={14} /> : <ArrowDownAZ size={14} />;
	return dir === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
}

export default function StudentTable() {
	const { filteredStudents, error, sortKey, sortDir, setSort } = useStudents();
	if (error) return <div className='text-error'>Error: {error}</div>;
	return (
		<div className='overflow-hidden rounded-xl border border-border shadow-sm'>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-secondary/5 border-b border-border text-left text-text-secondary'>
						<th className='p-4 w-1/3 font-medium'>
							<div className='flex items-center gap-2'>
								<span>Student Info ({filteredStudents.length})</span>
								<button
									onClick={() => setSort('name')}
									title='Sort by name'
									className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-semibold border transition-colors ${
										sortKey === 'name' ?
											'border-primary text-primary bg-primary/10'
										:	'border-border text-text-secondary hover:border-primary/50'
									}`}>
									A–Z
									<SortIcon
										active={sortKey === 'name'}
										dir={sortDir}
										type='name'
									/>
								</button>
								<button
									onClick={() => setSort('date_created')}
									title='Sort by date added'
									className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-semibold border transition-colors ${
										sortKey === 'date_created' ?
											'border-primary text-primary bg-primary/10'
										:	'border-border text-text-secondary hover:border-primary/50'
									}`}>
									Date
									<SortIcon
										active={sortKey === 'date_created'}
										dir={sortDir}
										type='date'
									/>
								</button>
							</div>
						</th>
						<th className='p-4 font-semibold'>Performance Metrics</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-border'>
					{filteredStudents.map((student) => (
						<StudentRow
							key={student.id}
							student={student}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
