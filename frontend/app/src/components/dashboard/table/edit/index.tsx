'use client';

import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { Pencil } from 'lucide-react';
import { Student } from '../../../../types/student';
import { useUpdateStudent } from './useUpdateStudent';
import ScoreList from './ScoreList';
import NewScoreForm from './NewScoreForm';

interface EditMasteryScoresProps {
	student: Student;
	editing: boolean;
	setEditing: Dispatch<SetStateAction<number | null>>;
	updateStudents: Dispatch<SetStateAction<Student[]>>;
}

export default function EditStudent({ student, editing, setEditing, updateStudents }: EditMasteryScoresProps) {
	const { addScore, deleteScore } = useUpdateStudent(student, updateStudents);

	const toggleEdit = (e: MouseEvent) => {
		e.stopPropagation();
		setEditing(editing ? null : student.id);
	};

	return (
		<div>
			<div className='flex gap-2'>
				<button
					onClick={toggleEdit}
					className='bg-primary rounded px-2 py-1 text-xs text-white font-medium flex flex-col items-center justify-center text-center transition duration-300 hover:opacity-90'>
					<Pencil size={12} />
				</button>
			</div>

			{editing && (
				<div className='mt-2'>
					<ScoreList
						scores={student.mastery_scores || {}}
						onDelete={deleteScore}
					/>
					<NewScoreForm onSave={addScore} />
				</div>
			)}
		</div>
	);
}
