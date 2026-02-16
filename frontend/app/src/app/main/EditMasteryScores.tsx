import { Dispatch, SetStateAction } from 'react';
import MasteryScoreRow from '../../../ui/MasteryScoreRow';
import { Student } from '../../types/student';

interface EditMasteryScoresProps {
	student: Student;
	editing: boolean;
	setEditing: Dispatch<SetStateAction<number | null>>;
}

export default function EditMasteryScores({ student, editing, setEditing }: EditMasteryScoresProps) {
	return (
		<div>
			<button
				className='bg-primary rounded px-2 py-1 text-xs text-white font-medium flex flex-col items-center justify-center text-center'
				onClick={(e) => {
					e.stopPropagation();
					setEditing(null);
				}}>
				<span className='block'>Edit</span>
				<span className='block'>Mastery Scores</span>
			</button>
			<div className={`${editing ? '' : 'hidden'}`}>
				{student.mastery_scores &&
					Object.entries(student.mastery_scores).map(([subject, score]) => (
						<MasteryScoreRow
							key={subject}
							subject={subject}
							score={score}
							className='mt-2'
						/>
					))}
			</div>
		</div>
	);
}
