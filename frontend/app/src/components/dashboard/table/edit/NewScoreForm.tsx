import { Dispatch, SetStateAction } from 'react';

interface NewScoreFormProps {
	subject: string;
	setSubject: Dispatch<SetStateAction<string>>;
	score: string;
	setScore: Dispatch<SetStateAction<string>>;
	date: string;
	setDate: Dispatch<SetStateAction<string>>;
}
export default function NewScoreForm({ subject, setSubject, score, setScore, date, setDate }: NewScoreFormProps) {
	return (
		<div className='relative pr-8 mt-2'>
			<div className='flex flex-col gap-1 p-2 rounded bg-background border border-border/50'>
				<div className='flex justify-between items-center'>
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
				{/* Date */}
				<input
					type='date'
					value={date}
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setDate(e.target.value)}
					className='text-xs text-text-secondary bg-transparent outline-none w-full'
				/>
			</div>
		</div>
	);
}
