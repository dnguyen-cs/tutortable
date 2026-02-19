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
			<span className={`font-bold ${getStatusColor(score)}`}>{score}</span>
		</div>
	);
}

const getStatusColor = (score: number) => {
	if (score >= 95) return 'text-success brightness-110';
	if (score >= 85) return 'text-success';
	if (score >= 75) return 'text-warning brightness-90';
	if (score >= 65) return 'text-warning';
	if (score >= 55) return 'text-warning brightness-75';
	if (score >= 45) return 'text-error brightness-90';
	return 'text-error';
};
