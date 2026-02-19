'use client';

import { useRouter } from 'next/navigation';
import { Student } from '@/types/student';
import AllMasteryScores from '@/components/AllMasteryScores';
import EditGradeForm from './edit/EditGradeForm';
import EditNameForm from './edit/EditNameForm';
import EditMasteryScoresForm from './edit/EditMasteryScoresForm';
import { useStudentEditor } from '@/hooks/useStudentEditor';
import EditToggleButton from './buttons/EditToggleButton';
import SaveButton from './buttons/SaveButton';
import DeleteButton from './buttons/DeleteButton';

export default function StudentRow({ student }: { student: Student }) {
	const editor = useStudentEditor(student);
	const router = useRouter();
	const isEditing = editor.editingStudentId === student.id;

	return (
		<tr
			onClick={() => router.push(`/student/${student.id}`)}
			className='bg-card hover:bg-secondary/15 cursor-pointer'>
			<td className='p-4 align-top'>
				<div className='flex flex-col'>
					{isEditing ?
						<EditModeContent
							student={student}
							editor={editor}
						/>
					:	<ViewModeContent student={student} />}

					{/* Action Buttons */}
					<div className='flex gap-2 mt-2'>
						<EditToggleButton
							studentId={student.id}
							isEditing={isEditing}
							setEditingStudentId={editor.setEditingStudentId}
						/>
						{isEditing && (
							<div className='flex w-full'>
								<SaveButton editor={editor} />
								<DeleteButton
									studentId={student.id}
									deleteStudent={editor.deleteStudent}
								/>
							</div>
						)}
					</div>
				</div>
			</td>

			<td className='p-4 align-top'>
				{!isEditing && (
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
						<AllMasteryScores student={student} />
					</div>
				)}
			</td>
		</tr>
	);
}

function ViewModeContent({ student }: { student: Student }) {
	return (
		<div className='flex flex-col text-text-primary'>
			<span className='font-bold text-lg'>{student.name}</span>
			<span className='text-sm font-medium text-text-secondary'>Grade: {student.grade_level}</span>
		</div>
	);
}

interface EditModeContentProps {
	student: Student;
	editor: ReturnType<typeof useStudentEditor>;
}

function EditModeContent({ student, editor }: EditModeContentProps) {
	return (
		<div className='flex flex-col gap-2 p-2'>
			<EditNameForm
				student={student}
				editedName={editor.editedName}
				setEditedName={editor.setEditedName}
			/>
			<EditGradeForm
				student={student}
				editedGrade={editor.editedGrade}
				setEditedGrade={editor.setEditedGrade}
			/>
			<EditMasteryScoresForm
				student={student}
				subject={editor.subject}
				setSubject={editor.setSubject}
				score={editor.score}
				setScore={editor.setScore}
				date={editor.date}
				setDate={editor.setDate}
			/>
		</div>
	);
}
