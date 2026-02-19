import { Student } from '@/types/student';
import MasteryScoreRow from './MasteryScoreRow';

export default function AllMasteryScores({ student }: { student: Student }) {
	
	return (
		student.mastery_scores &&
		Object.entries(student.mastery_scores).map(([subject, score]) => (
			<MasteryScoreRow
				key={subject}
				subject={subject}
				score={score}
			/>
		))
	);
}
