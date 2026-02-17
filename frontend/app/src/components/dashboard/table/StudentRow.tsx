'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, MouseEvent, useState } from 'react';
import { Student } from '../../../types/student';
import EditStudent from './edit';
import MasteryScoreRow from '../../MasteryScoreRow';
import { Check } from 'lucide-react';

interface StudentRowProps {
	student: Student;
	isEditing: boolean;
	setEditingId: Dispatch<SetStateAction<number | null>>;
	updateStudents: Dispatch<SetStateAction<Student[]>>;
}

// TODO Add editing functionality (Name, Grade)
// TODO Refactor this file
export default function StudentRow({ student, isEditing, setEditingId, updateStudents }: StudentRowProps) {
	const router = useRouter();
	const [editedName, setEditedName] = useState(student.name);
	const [editedGrade, setEditedGrade] = useState(student.grade_level);

	const handleRowClick = () => {
		router.push(`/student/${student.id}`);
	};

	const handleNameChange = (e: MouseEvent) => {
		e.stopPropagation();
		console.log('Name Change Clicked');
	};

	const handleGradeChange = (e: MouseEvent) => {
		e.stopPropagation();
		console.log('Grade Change Clicked');
	};

	return (
		<tr
			onClick={handleRowClick}
			className='bg-card hover:bg-secondary/15 cursor-pointer transition-colors'>
			<td className='p-4 align-top'>
				<div className='mb-2'>
					{isEditing ?
						<div className='relative'>
							<input
								type='text'
								value={editedName}
								onChange={(e) => setEditedName(e.target.value)}
								onClick={(e) => e.stopPropagation()}
								className='font-bold text-lg text-text-primary bg-background border border-border rounded w-10/12'
							/>
							<button
								onClick={handleNameChange}
								className={
									editedName.trim() == student.name ?
										'hidden'
									:	`text-success absolute right-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer`
								}>
								<Check size={18} />
							</button>
						</div>
					:	<div className='font-bold text-lg text-text-primary'>{student.name}</div>}
				</div>
				<div className='text-sm text-text-secondary mb-2'>
					{isEditing ?
						<div className='relative'>
							<div className='flex items-center gap-2'>
								<span>Grade:</span>
								<input
									type='text'
									value={editedGrade}
									onChange={(e) => setEditedGrade(parseInt(e.target.value) || 0)}
									onClick={(e) => e.stopPropagation()}
									className='bg-background border border-border rounded px-2 py-1 w-20'
								/>
							</div>
							<button
								onClick={handleGradeChange}
								className={
									editedGrade == student.grade_level ?
										'hidden'
									:	`text-success absolute right-0 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer`
								}>
								<Check size={18} />
							</button>
						</div>
					:	<>Grade: {student.grade_level}</>}
				</div>

				<EditStudent
					student={student}
					editing={isEditing}
					setEditing={setEditingId}
					updateStudents={updateStudents}
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
