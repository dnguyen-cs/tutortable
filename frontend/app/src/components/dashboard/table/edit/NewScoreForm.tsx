import { Dispatch, SetStateAction } from 'react';

interface NewScoreFormProps {
	subject: string;
	setSubject: Dispatch<SetStateAction<string>>;
	score: string;
	setScore: Dispatch<SetStateAction<string>>;
}
export default function NewScoreForm({ subject, setSubject, score, setScore }: NewScoreFormProps) {

	return (
		<div className='relative pr-8 mt-2'>
			<div className='flex justify-between items-center p-2 rounded bg-background border border-border/50'>
				{/* Subject Edit */}
				<input
					type='text'
					placeholder='Subject'
					value={subject}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setSubject(e.target.value)}
					className='text-sm font-bold w-2/3 placeholder:text-text-secondary/50 bg-transparent outline-none'
				/>
				{/* Score Edit */}
				<input
					type='text'
					placeholder='Score'
					value={score}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setScore(e.target.value)}
					className='font-bold w-1/4 text-sm placeholder:text-text-secondary/50 bg-transparent outline-none'
				/>
			</div>
		</div>
	);
}
