import { Trash2 } from 'lucide-react';
import MasteryScoreRow from '@/components/MasteryScoreRow';
import { Student } from '@/types/student';
import { useStudentEditor } from '@/hooks/useStudentEditor';

interface ScoreListProps {
	student: Student;
	scores: Record<string, number>;
}

export default function ScoreList({ student, scores }: ScoreListProps) {
	const { deleteScore } = useStudentEditor(student);

	return (
		<div className='relative pr-8 mb-2'>
			{Object.entries(scores).map(([subject, score]) => (
				<div
					className='relative pr-8 mb-2'
					key={subject}>
					<MasteryScoreRow
						subject={subject}
						score={score}
					/>
					<button
						onClick={(e) => {
							e.stopPropagation();
							deleteScore(subject);
						}}
						className='absolute right-0 top-1/2 -translate-y-1/2 hover:text-error transition-colors'>
						<Trash2 size={20} />
					</button>
				</div>
			))}
		</div>
	);
}
