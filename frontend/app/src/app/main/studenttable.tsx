'use client';
import { Student } from '../../types/student';
import { useRouter } from 'next/navigation';
import MasteryScoreRow from '../../../ui/MasteryScoreRow';
import EditMasteryScores from './EditMasteryScores';
import { useState } from 'react';

interface StudentTableProps {
	students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
	const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

	const router = useRouter();
	const handleStudentClick = (student: Student) => {
		router.push('/student/' + student.id);
		return;
	};

	return (
		<div className='overflow-hidden rounded-xl border border-border shadow-sm'>
			<table className='w-full border-collapse'>
				<thead>
					<tr className='bg-secondary/5 border-b border-border'>
						<th className='p-4 text-left text-text-secondary w-1/3'>{`Student Info (${students.length})`}</th>
						<th className='p-4 text-left text-text-secondary font-semibold'>Performance Metrics</th>
					</tr>
				</thead>
				<tbody className='divide-y divide-border'>
					{students.map((student) => {
						const editing = editingStudentId === student.id;
						return (
							<tr
								onClick={() => handleStudentClick(student)}
								key={student.id}
								className='bg-card hover:bg-secondary/15 cursor-pointer'>
								<td className='p-4 align-top'>
									<div className='font-bold text-lg text-text-primary'>{student.name}</div>
									<div className='text-sm text-text-secondary'>Grade: {student.grade_level}</div>
									<EditMasteryScores
										student={student}
										editing={editing}
										setEditing={() => setEditingStudentId(editing ? null : student.id)}
									/>
								</td>
								<td className='p-4'>
									<div
										className={`${!editing ? '' : 'hidden'} grid grid-cols-1 sm:grid-cols-2 gap-3`}>
										{student.mastery_scores &&
											Object.entries(student.mastery_scores).map(([subject, score]) => (
												<MasteryScoreRow
													key={subject}
													subject={subject}
													score={score}
												/>
											))}
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
