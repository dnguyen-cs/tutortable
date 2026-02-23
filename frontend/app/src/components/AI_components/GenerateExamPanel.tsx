'use client';
import { useEffect, useState } from 'react';
import { X, Sparkles, ChevronDown, ChevronRight, GraduationCap } from 'lucide-react';
import { Student } from '@/types/student';
import { TOPICS, Topic } from '@/lib/topics';
import CustomTopicInput from './CustomTopicInput';
import { useDraggablePanel } from '@/hooks/useDraggablePanel';

interface GenerateExamPanelProps {
	student: Student;
	onClose: () => void;
}

export default function GenerateExamPanel({ student, onClose }: GenerateExamPanelProps) {
	{/* Disable Global Scrollbar */}
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

	const { width, onDragHandleMouseDown } = useDraggablePanel();
	const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
	const [selectedSubTopics, setSelectedSubTopics] = useState<Set<string>>(new Set());
	const [customTopics, setCustomTopics] = useState<string[]>([]);

	const toggleExpand = (topicId: string) => {
		setExpandedTopics((prev) => {
			const next = new Set(prev);
			next.has(topicId) ? next.delete(topicId) : next.add(topicId);
			return next;
		});
	};

	const toggleSubTopic = (subTopicId: string) => {
		setSelectedSubTopics((prev) => {
			const next = new Set(prev);
			next.has(subTopicId) ? next.delete(subTopicId) : next.add(subTopicId);
			return next;
		});
	};

	const toggleAllInTopic = (topic: Topic) => {
		const ids = topic.subTopics.map((s) => s.id);
		const allSelected = ids.every((id) => selectedSubTopics.has(id));
		setSelectedSubTopics((prev) => {
			const next = new Set(prev);
			if (allSelected) {
				ids.forEach((id) => next.delete(id));
			} else {
				ids.forEach((id) => next.add(id));
			}
			return next;
		});
	};

	const removeCustomTopic = (topic: string) => {
		setCustomTopics((prev) => prev.filter((t) => t !== topic));
	};

	const selectedCount = selectedSubTopics.size + customTopics.length;

	const handleGenerate = () => {
		if (selectedCount === 0) return;
		const config = {
			student: student.id,
			gradeLevel: student.grade_level,
			topics: [...Array.from(selectedSubTopics), ...customTopics],
		};
		console.log('Generate exam:', config);
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
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-border'>
					<h2 className='text-lg font-black text-text-primary'>Generate Exam</h2>
					<button
						onClick={onClose}
						className='text-text-secondary hover:text-text-primary p-1 rounded-lg hover:bg-secondary/20'>
						<X size={20} />
					</button>
				</div>

				{/* Scrollable body */}
				<div className='flex-1 overflow-y-auto p-6 flex flex-col gap-6'>
					{/* Welcome callout */}
					<div className='bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-start gap-3'>
						<GraduationCap
							size={22}
							className='text-primary mt-0.5 shrink-0'
						/>
						<div>
							<p className='font-bold text-text-primary'>New Student Detected</p>
							<p className='text-sm text-text-secondary mt-1 leading-relaxed'>
								It looks like <span className='font-semibold text-text-primary'>{student.name}</span> is
								a new student. Would you like to administer an exam based on their grade level to see
								what they currently know? You can also add a Mastery Score on the student table to skip
								this exam.
							</p>
						</div>
					</div>

					{/* Grade level badge */}
					<div className='flex items-center gap-2'>
						<span className='text-sm text-text-secondary font-medium'>Grade Level</span>
						<span className='bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full'>
							Grade {student.grade_level}
						</span>
					</div>

					{/* Topic selector */}
					<div>
						<div className='flex items-center justify-between mb-3'>
							<label className='font-bold text-text-primary'>Select Topics</label>
							<div className='flex gap-2 text-xs font-bold'>
								<button
									onClick={() =>
										setSelectedSubTopics(
											new Set(TOPICS.flatMap((t) => t.subTopics.map((s) => s.id))),
										)
									}
									className='hover:underline text-secondary hover:text-primary'>
									ALL
								</button>
								<span className='text-text-secondary'>|</span>
								<button
									onClick={() => setSelectedSubTopics(new Set())}
									className='hover:underline text-secondary hover:text-primary'>
									NONE
								</button>
							</div>
						</div>

						<div className='flex flex-col gap-2'>
							{TOPICS.map((topic) => {
								const isExpanded = expandedTopics.has(topic.id);
								const selectedInTopic = topic.subTopics.filter((s) =>
									selectedSubTopics.has(s.id),
								).length;
								const allInTopicSelected = selectedInTopic === topic.subTopics.length;

								return (
									<div
										key={topic.id}
										className='border-2 border-border rounded-2xl overflow-hidden'>
										{/* Topic header row */}
										<div className='flex items-center gap-2 px-4 py-3'>
											<button
												onClick={() => toggleAllInTopic(topic)}
												className={`w-5 h-5 rounded-md border-2 shrink-0 transition-colors flex items-center justify-center ${
													allInTopicSelected ? 'bg-primary border-primary'
													: selectedInTopic > 0 ? 'bg-primary/30 border-primary'
													: 'border-border'
												}`}>
												{(allInTopicSelected || selectedInTopic > 0) && (
													<span className='text-white text-[10px] font-black leading-none'>
														{allInTopicSelected ? '✓' : '–'}
													</span>
												)}
											</button>
											<button
												onClick={() => toggleExpand(topic.id)}
												className='flex-1 flex items-center justify-between text-left'>
												<span className='font-bold text-text-primary'>{topic.label}</span>
												<div className='flex items-center gap-2'>
													{selectedInTopic > 0 && (
														<span className='text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full'>
															{selectedInTopic}/{topic.subTopics.length}
														</span>
													)}
													{isExpanded ?
														<ChevronDown
															size={16}
															className='text-text-secondary'
														/>
													:	<ChevronRight
															size={16}
															className='text-text-secondary'
														/>
													}
												</div>
											</button>
										</div>

										{/* Sub-topics */}
										{isExpanded && (
											<div className='border-t border-border bg-background px-4 py-3 flex flex-wrap gap-2'>
												{topic.subTopics.map((sub) => {
													const isSelected = selectedSubTopics.has(sub.id);
													return (
														<button
															key={sub.id}
															onClick={() => toggleSubTopic(sub.id)}
															className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-colors ${
																isSelected ?
																	'bg-primary text-white border-primary'
																:	'bg-transparent text-text-secondary border-border hover:border-primary/50'
															}`}>
															{sub.label}
														</button>
													);
												})}
											</div>
										)}
									</div>
								);
							})}
						</div>

						{selectedCount === 0 && (
							<p className='text-xs text-error mt-3 font-medium'>
								Select at least one topic to generate an exam.
							</p>
						)}
					</div>

					{/* Custom Topics */}
					<CustomTopicInput
						customTopics={customTopics}
						onAdd={(topic) => setCustomTopics((prev) => [...prev, topic])}
						onRemove={removeCustomTopic}
					/>
				</div>

				{/* Footer */}
				<div className='p-6 border-t border-border'>
					<button
						onClick={handleGenerate}
						disabled={selectedCount === 0}
						className='w-full flex items-center justify-center gap-2 bg-primary text-white font-black py-3 rounded-2xl shadow-lg shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed'>
						<Sparkles size={18} />
						{selectedCount === 0 ?
							'Generate Exam'
						:	`Generate Exam · ${selectedCount} topic${selectedCount !== 1 ? 's' : ''}`}
					</button>
				</div>
			</div>
		</>
	);
}
