import { Check } from 'lucide-react';
import { useStudentEditor } from '@/hooks/useStudentEditor';
import BaseButton from './BaseButton';

export default function SaveButton({ editor }: { editor: ReturnType<typeof useStudentEditor> }) {
	const hasChanges = editor.hasNameChanged || editor.hasGradeChanged || editor.hasMasteryScoreValues;
	if (!hasChanges) return null;

	const handleSave = async () => {
		if (editor.hasNameChanged) await editor.handleNameChange();
		if (editor.hasGradeChanged) await editor.handleGradeChange();
		if (editor.hasMasteryScoreValues) await editor.handleMasteryScoreAdd(editor.subject, editor.score);
		editor.setEditingStudentId(null);
	};

	return (
		<BaseButton
			onClick={handleSave}
			className='bg-success'>
			<Check size={12} />
		</BaseButton>
	);
}
