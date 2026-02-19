'use client';

import StudentRow from './StudentRow';
import { useStudents } from '@/hooks/StudentsContext';

export default function StudentTable() {
	const { filteredStudents } = useStudents();

	return (
		<div className='overflow-hidden rounded-xl border border-border shadow-sm'>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-secondary/5 border-b border-border text-left text-text-secondary'>
						<th className='p-4 w-1/3 font-medium'>{`Student Info (${filteredStudents.length})`}</th>
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
