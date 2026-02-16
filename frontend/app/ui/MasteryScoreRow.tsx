interface MasteryScoreRowProps {
	subject: string;
	score: number;
	className?: string;
}

export default function Row({ subject, score, className }: MasteryScoreRowProps) {
	return (
		<div className={`flex justify-between items-center p-2 rounded bg-background border border-border/50 ${className}`}>
			<span className='text-sm font-medium'>{subject}:</span>
			<span className={`font-bold ${getStatusColor(score)}`}>{score}</span>
		</div>
	);
}

const getStatusColor = (score: number) => {
	if (score >= 90) return 'text-success';
	if (score >= 75) return 'text-warning';
	if (score < 65) return 'text-error';
	return 'text-text-secondary';
};
