import { Dispatch, SetStateAction } from 'react';
import BaseButton from './BaseButton';

interface DeleteButtonProps {
	studentId: number;
	deleteStudent: Dispatch<SetStateAction<number | null>>;
}

export default function DeleteButton({ studentId, deleteStudent }: DeleteButtonProps) {
	return (
		<BaseButton
			onClick={() => deleteStudent(studentId)}
			className='bg-red-500 ml-auto'>
			Delete Student
		</BaseButton>
	);
}
