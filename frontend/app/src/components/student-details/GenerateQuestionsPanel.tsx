'use client';
import { useState } from 'react';
import { X, Sparkles, Zap } from 'lucide-react';
import { Student } from '@/types/student';

interface GenerateQuestionsPanelProps {
	student: Student;
	onClose: () => void;
}

const DIFFICULTY_OPTIONS = ['Mixed', 'Easy', 'Medium', 'Hard'] as const;

export default function GenerateQuestionsPanel({ student, onClose }: GenerateQuestionsPanelProps) {
	const availableTopics = Object.keys(student.mastery_scores);

	const [numQuestions, setNumQuestions] = useState(10);
	const [selectedTopics, setSelectedTopics] = useState<string[]>(availableTopics);
	const [difficulty, setDifficulty] = useState<(typeof DIFFICULTY_OPTIONS)[number]>('Mixed');

	const toggleTopic = (topic: string) => {
		setSelectedTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
	};

	const handleQuickGenerate = () => {
		const config = {
			numQuestions: 5,
			topics: availableTopics,
			difficulty: 'Mixed',
		};
		console.log('Quick generate:', config);
		// TODO: call API
	};

	const handleGenerate = () => {
		if (selectedTopics.length === 0) return;
		const config = { numQuestions, topics: selectedTopics, difficulty };
		console.log('Generate with config:', config);
		// TODO: call API
	};

	return (
		<>
			{/* Backdrop */}
			<div
				className='fixed inset-0 z-40 backdrop-blur-xs'
				onClick={onClose}
			/>

			{/* Panel */}
			<div className='fixed top-0 right-0 h-full w-full max-w-md bg-card border-l-2 border-border z-50 flex flex-col shadow-2xl animate-slide-in-right'>
				{/* Panel Header */}
				<div className='flex items-center justify-between p-6 border-b border-border'>
					<div className='flex items-center gap-2'>
						<Sparkles
							size={20}
							className='text-primary'
						/>
						<h2 className='text-lg font-black text-text-primary'>Generate Questions</h2>
					</div>
					<button
						onClick={onClose}
						className='text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-secondary/20'>
						<X size={20} />
					</button>
				</div>

				{/* Scrollable body */}
				<div className='flex-1 overflow-y-auto p-6 flex flex-col gap-6'>
					{/* Quick Generate */}
					<div className='bg-primary/10 border border-primary/30 rounded-2xl p-4'>
						<div className='flex items-start gap-3'>
							<Zap
								size={20}
								className='text-primary mt-0.5 shrink-0'
							/>
							<div className='flex-1'>
								<p className='font-bold text-text-primary'>Quick Generate</p>
								<p className='text-sm text-text-secondary mt-0.5'>
									Generate 5 mixed questions across all topics instantly.
								</p>
							</div>
							<button
								onClick={handleQuickGenerate}
								className='bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow shadow-primary/30 shrink-0'>
								Go
							</button>
						</div>
					</div>

					{/* Number of questions */}
					<div>
						<label className='block font-bold text-text-primary mb-3'>
							Number of Questions
							<span className='ml-2 text-primary font-black'>{numQuestions}</span>
						</label>
						<input
							type='range'
							min={1}
							max={50}
							value={numQuestions}
							onChange={(e) => setNumQuestions(Number(e.target.value))}
							className='w-full accent-primary mb-0 border-none ring-0 hover:ring-0 focus:ring-0 bg-transparent p-0'
						/>
						<div className='flex justify-between text-xs text-text-secondary mt-1'>
							<span>1</span>
							<span>25</span>
							<span>50</span>
						</div>
					</div>

					{/* Difficulty */}
					<div>
						<label className='block font-bold text-text-primary mb-3'>Difficulty</label>
						<div className='flex gap-2 flex-wrap'>
							{DIFFICULTY_OPTIONS.map((d) => (
								<button
									key={d}
									onClick={() => setDifficulty(d)}
									className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-colors ${
										difficulty === d ?
											'bg-primary text-white border-primary'
										:	'bg-transparent text-text-secondary border-border hover:border-primary/50'
									}`}>
									{d}
								</button>
							))}
						</div>
					</div>

					{/* Topics */}
					{availableTopics.length > 0 && (
						<div>
							<div className='flex items-center justify-between mb-3'>
								<label className='font-bold text-text-primary'>Topics</label>
								<div className='flex gap-2 text-xs font-bold'>
									<button
										onClick={() => setSelectedTopics(availableTopics)}
										className='text-primary hover:underline'>
										All
									</button>
									<span className='text-text-secondary'>·</span>
									<button
										onClick={() => setSelectedTopics([])}
										className='text-text-secondary hover:underline'>
										None
									</button>
								</div>
							</div>
							<div className='flex flex-col gap-2'>
								{availableTopics.map((topic) => {
									const score = student.mastery_scores[topic];
									const isSelected = selectedTopics.includes(topic);
									return (
										<button
											key={topic}
											onClick={() => toggleTopic(topic)}
											className={`flex items-center justify-between px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors text-left ${
												isSelected ?
													'bg-primary/10 border-primary text-text-primary'
												:	'bg-transparent border-border text-text-secondary'
											}`}>
											<span className='capitalize'>{topic}</span>
											<span
												className={`text-xs font-bold px-2 py-0.5 rounded-full ${
													score >= 80 ? 'bg-success/20 text-success'
													: score >= 50 ? 'bg-warning/20 text-warning'
													: 'bg-error/20 text-error'
												}`}>
												{score}%
											</span>
										</button>
									);
								})}
							</div>
							{selectedTopics.length === 0 && (
								<p className='text-xs text-error mt-2 font-medium'>
									Select at least one topic to generate questions.
								</p>
							)}
						</div>
					)}
				</div>

				{/* Footer */}
				<div className='p-6 border-t border-border'>
					<button
						onClick={handleGenerate}
						disabled={selectedTopics.length === 0}
						className='w-full flex items-center justify-center gap-2 bg-primary text-white font-black py-3 rounded-2xl shadow-lg shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100'>
						<Sparkles size={18} />
						Generate {numQuestions} Question{numQuestions !== 1 ? 's' : ''}
					</button>
				</div>
			</div>
		</>
	);
}
