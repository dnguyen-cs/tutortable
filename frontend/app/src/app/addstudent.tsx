import { Plus } from 'lucide-react';
export default function AddStudent() {
	return (
		<div>
			<button className='flex items-center justify-center gap-2 bg-primary dark:bg-primary-dark text-white dark:text-background-dark px-4 py-2 rounded-lg font-medium'>
				<Plus className='w-4 h-4' /> Add Student
			</button>
		</div>
	);
}
