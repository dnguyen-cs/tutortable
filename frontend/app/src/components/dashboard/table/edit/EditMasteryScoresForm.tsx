'use client';

import { Student } from '@/types/student';
import ScoreList from './ScoreList';
import NewScoreForm from './NewScoreForm';
import { Dispatch, SetStateAction } from 'react';

interface EditMasteryScoresProps {
	student: Student;
	subject: string;
	setSubject: Dispatch<SetStateAction<string>>;
	score: string;
	setScore: Dispatch<SetStateAction<string>>;
	date: string;
	setDate: Dispatch<SetStateAction<string>>;
}

export default function EditMasteryScores({
	student,
	subject,
	setSubject,
	score,
	setScore,
	date,
	setDate,
}: EditMasteryScoresProps) {
	return (
		<div>
			<div className='mt-2'>
				{/* Existing Scores (edit/delete) */}
				<ScoreList
					student={student}
					scores={student.mastery_scores || {}}
				/>
				{/* New Score Form */}
				<NewScoreForm
					subject={subject}
					setSubject={setSubject}
					score={score}
					setScore={setScore}
					date={date}
					setDate={setDate}
				/>
			</div>
		</div>
	);
}
