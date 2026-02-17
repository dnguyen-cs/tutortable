import { useState, MouseEvent } from 'react';
import { Check } from 'lucide-react';

interface NewScoreFormProps {
	onSave: (subject: string, score: string) => Promise<void>;
}

export default function NewScoreForm({ onSave }: NewScoreFormProps) {
	const [subject, setSubject] = useState('');
	const [score, setScore] = useState('');

	const handleSubmit = async (e: MouseEvent) => {
		e.stopPropagation();
		if (!subject || !score) return;

		const numScore = Number(score);
		if (isNaN(numScore) || numScore < 0 || numScore > 100) {
			alert('Score must be a number between 0 and 100');
			return;
		}

		await onSave(subject, score);
		setSubject('');
		setScore('');
	};

	return (
		<div className='relative pr-8 mt-2'>
			<div className='flex justify-between items-center p-2 rounded bg-background border border-border/50'>
				<input
					type='text'
					placeholder='Subject'
					value={subject}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setSubject(e.target.value)}
					className='text-sm font-bold w-2/3 placeholder:text-text-secondary/50 bg-transparent outline-none'
				/>
				<input
					type='text'
					placeholder='Score'
					value={score}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setScore(e.target.value)}
					className='font-bold w-1/4 text-sm placeholder:text-text-secondary/50 bg-transparent outline-none'
				/>
			</div>

			{subject && score && (
				<button
					onClick={handleSubmit}
					className='absolute right-0 top-1/2 -translate-y-1/2 text-success hover:scale-110 transition-transform p-1'>
					<Check size={18} />
				</button>
			)}
		</div>
	);
}
