import { Dispatch, SetStateAction, MouseEvent, useState } from 'react';
import { Trash2, Pencil, Check } from 'lucide-react';
import MasteryScoreRow from '../../MasteryScoreRow';
import { Student } from '../../../types/student';

interface EditMasteryScoresProps {
	student: Student;
	editing: boolean;
	setEditing: Dispatch<SetStateAction<number | null>>;
}

export default function EditMasteryScores({ student, editing, setEditing }: EditMasteryScoresProps) {
	const [newSubject, setNewSubject] = useState('');
	const [newScore, setNewScore] = useState('');

	const handleEditClick = (e: MouseEvent) => {
		e.stopPropagation();
		setEditing(editing ? null : student.id);
	};
	const handleSaveNew = (e: MouseEvent) => {
		e.stopPropagation();
		if (!newSubject || !newScore) return;
		console.log('Saving:', { subject: newSubject, score: Number(newScore) });

		// TODO: Add API call
		setNewSubject('');
		setNewScore('');
	};
	const handleDelete = (e: MouseEvent) => {
		e.stopPropagation();
		// TODO: Implement delete functionality
	};

	return (
		<div>
			<div className={`flex gap-2`}>
				<button
					onClick={handleEditClick}
					className={buttonStyle}>
					<Pencil size={12} />
				</button>
			</div>
			<div className={`${editing ? '' : 'hidden'}`}>
				{student.mastery_scores &&
					Object.entries(student.mastery_scores).map(([subject, score]) => (
						<div
							className='relative pr-8'
							key={subject}>
							<MasteryScoreRow
								subject={subject}
								score={score}
								className='mt-2'
							/>
							<Trash2
								onClick={handleDelete}
								className='hover:border-2 absolute right-0 top-1/2 -translate-y-1/2'
							/>
						</div>
					))}
				{/* Input Area */}
				<div className='relative'>
					<InputArea
						newSubject={newSubject}
						setNewSubject={setNewSubject}
						newScore={newScore}
						setNewScore={setNewScore}
						editing={editing}
					/>
					{/* Save Button for new row */}
					<SaveButton
						handleSaveNew={handleSaveNew}
						newSubject={newSubject}
						newScore={newScore}
					/>
				</div>
			</div>
		</div>
	);
}

function SaveButton({
	handleSaveNew,
	newSubject,
	newScore,
}: {
	handleSaveNew: (e: MouseEvent) => void;
	newSubject: string;
	newScore: string;
}) {
	return (
		newSubject &&
		newScore && (
			<button
				onClick={handleSaveNew}
				className='absolute right-0 top-1/2 -translate-y-1/2 text-success hover:scale-110 transition-transform hover:border-2'>
				<Check />
			</button>
		)
	);
}

function InputArea({
	newSubject,
	setNewSubject,
	newScore,
	setNewScore,
	editing,
}: {
	newSubject: string;
	setNewSubject: Dispatch<SetStateAction<string>>;
	newScore: string;
	setNewScore: Dispatch<SetStateAction<string>>;
	editing: boolean;
}) {
	return (
		<div className={`${editing ? '' : 'hidden'} relative pr-8 mt-2`}>
			<div className='flex justify-between items-center p-2 rounded bg-background border border-border/50'>
				<input
					type='text'
					placeholder='Subject'
					value={newSubject}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setNewSubject(e.target.value)}
					className='text-sm font-bold w-2/3 placeholder:text-text-secondary/50'
				/>
				<input
					type='text'
					placeholder='Score'
					value={newScore}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setNewScore(e.target.value)}
					className='font-bold w-1/4 text-sm placeholder:text-text-secondary/50'
				/>
			</div>
		</div>
	);
}
const buttonStyle =
	'bg-primary rounded px-2 py-1 text-xs text-white font-medium flex flex-col items-center justify-center text-center';
