import { getStatusColor } from '@/lib/functions';
interface MasteryScoreRowProps {
	subject: string;
	score: number;
	className?: string;
}

export default function Row({ subject, score, className }: MasteryScoreRowProps) {
	return (
		<div
			className={`flex justify-between items-center p-2 rounded bg-background border border-border/50 ${className}`}>
			<span className='text-sm font-medium'>{subject}:</span>
			<span className={`font-bold ${getStatusColor(score)}`}>{score}%</span>

		</div>
	);
}