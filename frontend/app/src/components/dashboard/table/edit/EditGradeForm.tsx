import { Student } from '@/types/student';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	student: Student;
	editedGrade: number;
	setEditedGrade: Dispatch<SetStateAction<number>>;
}

export default function EditGradeForm({ student, editedGrade, setEditedGrade }: Props) {
	return (
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
		</div>
	);
}
