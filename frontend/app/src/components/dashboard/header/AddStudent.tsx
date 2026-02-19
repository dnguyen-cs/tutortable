'use client';
import { Plus, X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface AddStudentProps {
	toggleForm: {
		showForm: boolean;
		setShowForm: Dispatch<SetStateAction<boolean>>;
	};
}

export default function AddStudentButton({ toggleForm }: AddStudentProps) {
	const { showForm, setShowForm } = toggleForm;

	return (
		<div>
			<button
				onClick={() => {
					setShowForm(!showForm);
				}}
				className='flex items-center justify-center gap-2 text-white bg-primary px-4 py-2 rounded-lg font-medium'>
				<div
					className={`${showForm ? 'hidden' : ''} flex items-center gap-2 align-middle`}>
					<Plus className='w-4 h-4' />
					Add Student
				</div>
				<div
					className={`${!showForm ? 'hidden' : ''} flex items-center gap-2 align-middle`}>
					<X className='w-4 h-4' />
					Close Form
				</div>
			</button>
		</div>
	);
}
