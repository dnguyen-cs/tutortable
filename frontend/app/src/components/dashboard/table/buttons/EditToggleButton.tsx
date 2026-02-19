import { Dispatch, SetStateAction } from 'react';
import { Pencil, X } from 'lucide-react';
import BaseButton from './BaseButton';

interface EditToggleButtonProps {
	studentId: number;
	isEditing: boolean;
	setEditingStudentId: Dispatch<SetStateAction<number | null>>;
}

export default function EditToggleButton({ studentId, isEditing, setEditingStudentId }: EditToggleButtonProps) {
	return (
		<BaseButton
			onClick={() => setEditingStudentId(isEditing ? null : studentId)}
			className='bg-primary'>
			{isEditing ?
				<span className='flex items-center gap-1'>
					<X size={12} />
				</span>
			:	<Pencil size={12} />}
		</BaseButton>
	);
}
