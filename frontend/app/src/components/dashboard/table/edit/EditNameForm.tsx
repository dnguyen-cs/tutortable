import { Student } from '@/types/student';
import { Dispatch, SetStateAction } from 'react';

interface Props {
	student: Student;
	editedName: string;
	setEditedName: Dispatch<SetStateAction<string>>;
}

export default function EditNameForm({ student, editedName, setEditedName }: Props) {
	return (
		<div className='relative'>
			<input
				type='text'
				value={editedName}
				onChange={(e) => setEditedName(e.target.value)}
				onClick={(e) => e.stopPropagation()}
				className='font-bold text-lg text-text-primary bg-background border border-border rounded w-10/12'
			/>
		</div>
	);
}
