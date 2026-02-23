'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { X, Sparkles, Zap } from 'lucide-react';
import CustomTopicInput from './CustomTopicInput';
import { useDraggablePanel } from '@/hooks/useDraggablePanel';
import { Student } from '@/types/student';
import { getStatusColor } from '@/lib/functions';
import SelectChoice from './SelectChoice';

interface GenerateQuestionsPanelProps {
	student: Student;
	onClose: () => void;
}

const DIFFICULTY_OPTIONS = ['Mixed', 'Easy', 'Medium', 'Hard'];
const QUESTION_TYPE_OPTIONS = ['Mixed', 'Multiple Choice', 'Short Answer'];

interface TopicsProps {
	topicsProps: {
		selectedTopics: Record<string, number>;
		setSelectedTopics: Dispatch<SetStateAction<Record<string, number>>>;
		masteryTopics: string[];
		student: Student;
		customTopics: string[];
		setCustomTopics: Dispatch<SetStateAction<string[]>>;
	};
}

function Topics({ topicsProps }: TopicsProps) {
	const { selectedTopics, setSelectedTopics, masteryTopics, student, customTopics, setCustomTopics } = topicsProps;
	const toggleTopic = (topic: string) => {
		setSelectedTopics((prev) => {
			if (topic in prev) {
				const { [topic]: _, ...rest } = prev;
				return rest;
			}
			return { ...prev, [topic]: student.mastery_scores[topic] ?? 0 };
		});
	};

	const removeCustomTopic = (topic: string) => {
		setCustomTopics((prev) => prev.filter((t) => t !== topic));
		setSelectedTopics((prev) => {
			const { [topic]: _, ...rest } = prev;
			return rest;
		});
	};

	return (
		<>
			{/* Mastery Topics Section */}
			{masteryTopics.length > 0 && (
				<div className='mb-6'>
					<div className='flex items-center justify-between mb-3'>
						<label className='font-bold text-text-primary'>Mastery Topics</label>
						<div className='flex gap-2 text-xs font-bold'>
							<button
								onClick={() => setSelectedTopics(Object.fromEntries([...masteryTopics, ...customTopics].map((t) => [t, student.mastery_scores[t] ?? 0])))}
								className={`hover:underline ${Object.keys(selectedTopics).length === masteryTopics.length + customTopics.length ? 'text-primary' : 'text-secondary'}`}>
								ALL
							</button>
							<span className='text-text-secondary'>|</span>
							<button
								onClick={() => setSelectedTopics({})}
								className={`hover:underline ${Object.keys(selectedTopics).length === 0 ? 'text-primary' : 'text-secondary'}`}>
								NONE
							</button>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						{masteryTopics.map((topic) => {
							const score = student.mastery_scores[topic];
							const isSelected = topic in selectedTopics;
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
										className={`text-xs font-bold px-2 py-0.5 rounded-full ${getStatusColor(score)}`}>
										{score}%
									</span>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Custom Topics */}
			<CustomTopicInput
				customTopics={customTopics}
				onAdd={(topic) => {
					setCustomTopics((prev) => [...prev, topic]);
					setSelectedTopics((prev) => ({ ...prev, [topic]: 0 }));
				}}
				onRemove={removeCustomTopic}
			/>

			{/* Error Message */}
			{Object.keys(selectedTopics).length === 0 && (
				<p className='text-xs text-error mt-2 font-medium'>Select at least one topic to generate questions.</p>
			)}
		</>
	);
}

export default function GenerateQuestionsPanel({ student, onClose }: GenerateQuestionsPanelProps) {
	{
		/* Disable Global Scrollbar */
	}
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const { width, onDragHandleMouseDown } = useDraggablePanel();
	const masteryTopics = Object.keys(student.mastery_scores);

	const [numQuestions, setNumQuestions] = useState(10);
	const [selectedTopics, setSelectedTopics] = useState<Record<string, number>>(
		Object.fromEntries(masteryTopics.map((t) => [t, student.mastery_scores[t]])),
	);
	const [difficulty, setDifficulty] = useState<(typeof DIFFICULTY_OPTIONS)[number]>('Mixed');
	const [customTopics, setCustomTopics] = useState<string[]>([]);
	const [questionType, setQuestionType] = useState<(typeof QUESTION_TYPE_OPTIONS)[number]>('Mixed');

	const topicsProps = {
		selectedTopics,
		setSelectedTopics,
		masteryTopics,
		student,
		customTopics,
		setCustomTopics,
	};

	const handleQuickGenerate = () => {
		// const config = {
		// 	numQuestions: 10,
		// 	topics: masteryTopics,
		// 	difficulty: 'Mixed',
		// };
		const config = {
			numQuestions: numQuestions,
			topics: selectedTopics,
			difficulty: difficulty,
			customTopics: customTopics,
			questionType: questionType,
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
			<div
				className='fixed top-0 right-0 h-full bg-card border-l-2 border-border z-50 flex flex-col shadow-2xl animate-slide-in-right'
				style={{ width }}>
				{/* Drag handle */}
				<div
					onMouseDown={onDragHandleMouseDown}
					className='absolute left-0 top-0 h-full w-1.5 cursor-ew-resize hover:bg-primary/30 active:bg-primary/50 transition-colors z-10'
				/>
				{/* Panel Header */}
				<div className='flex items-center justify-between p-6 border-b border-border'>
					<h2 className='text-lg font-black text-text-primary'>Generate Questions</h2>
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
									Generate 10 mixed questions across all topics instantly.
								</p>
							</div>
							<button
								onClick={handleQuickGenerate}
								className='bg-primary text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow shadow-primary/30 shrink-0'>
								GO
							</button>
						</div>
					</div>

					{/* Number of questions */}
					<>
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
							className='w-full ring-0 hover:ring-0 focus:ring-0 p-0'
						/>
						<div className='flex justify-between text-xs text-text-secondary mt-1'>
							<span>1</span>
							<span>25</span>
							<span>50</span>
						</div>
					</>

					{/* Difficulty */}
					<SelectChoice
						options={DIFFICULTY_OPTIONS}
						selectedOption={difficulty}
						setSelectedOption={setDifficulty}
					/>

					{/* Question Types */}
					<SelectChoice
						options={QUESTION_TYPE_OPTIONS}
						selectedOption={questionType}
						setSelectedOption={setQuestionType}
					/>

					{/* Topics */}
					<Topics topicsProps={topicsProps} />
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
