'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import { Student } from '../../../types/student';
import StudentRow from './StudentRow';

interface StudentTableProps {
	students: Student[];
	updateStudents: Dispatch<SetStateAction<Student[]>>;
}

export default function StudentTable({ students, updateStudents }: StudentTableProps) {
	const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

	return (
		<div className='overflow-hidden rounded-xl border border-border shadow-sm'>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-secondary/5 border-b border-border text-left text-text-secondary'>
						<th className='p-4 w-1/3 font-medium'>{`Student Info (${students.length})`}</th>
						<th className='p-4 font-semibold'>Performance Metrics</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-border'>
					{students.map((student) => (
						<StudentRow
							key={student.id}
							student={student}
							isEditing={editingStudentId === student.id}
							setEditingId={setEditingStudentId}
							updateStudents={updateStudents}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}
