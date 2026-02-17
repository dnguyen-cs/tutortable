'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Student } from '../../../types/student';
import EditMasteryScores from './EditMasteryScores';
import MasteryScoreRow from '../../MasteryScoreRow';

interface StudentRowProps {
	student: Student;
	isEditing: boolean;
	setEditingId: Dispatch<SetStateAction<number | null>>;
}

export default function StudentRow({ student, isEditing, setEditingId }: StudentRowProps) {
	const router = useRouter();

	const handleRowClick = () => {
		router.push(`/student/${student.id}`);
	};

	return (
		<tr
			onClick={handleRowClick}
			className='bg-card hover:bg-secondary/15 cursor-pointer transition-colors'>
			<td className='p-4 align-top'>
				<div className='font-bold text-lg text-text-primary'>{student.name}</div>
				<div className='text-sm text-text-secondary mb-2'>Grade: {student.grade_level}</div>

				<EditMasteryScores
					student={student}
					editing={isEditing}
					setEditing={setEditingId}
				/>
			</td>

			<td className='p-4 align-top'>
				<div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${isEditing ? 'hidden' : ''}`}>
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
}
