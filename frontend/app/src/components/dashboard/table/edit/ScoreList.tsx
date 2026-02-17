import { Trash2 } from 'lucide-react';
import MasteryScoreRow from '../../../MasteryScoreRow';

interface ScoreListProps {
	scores: Record<string, number>;
	onDelete: (subject: string) => void;
}

export default function ScoreList({ scores, onDelete }: ScoreListProps) {
	return (
		<div>
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
							onDelete(subject);
						}}
						className='absolute right-0 top-1/2 -translate-y-1/2 hover:text-error transition-colors'>
						<Trash2 size={16} />
					</button>
				</div>
			))}
		</div>
	);
}
