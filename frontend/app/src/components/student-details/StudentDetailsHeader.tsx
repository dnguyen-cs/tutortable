'use client';
import { useState } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import { Student } from '@/types/student';
import GenerateQuestionsPanel from './GenerateQuestionsPanel';

export default function Header({ student }: { student: Student }) {
	const [showPanel, setShowPanel] = useState(false);

	return (
		<>
			<header className='flex flex-row items-end justify-between border-b-2 border-border pb-4'>
				<div>
					<div className='flex items-center gap-2 mb-2'>
						<span className='bg-primary/10 text-primary font-bold uppercase tracking-widest px-2 py-1 rounded'>
							Student Profile
						</span>
					</div>
					<h1 className='text-4xl font-black tracking-tight text-text-primary'>{student.name}</h1>
					<p className='text-text-secondary mt-1 flex items-center gap-2'>
						<GraduationCap size={18} /> Grade {student.grade_level}
					</p>
				</div>

				<div className='flex items-center gap-4'>
					<div className='text-right'>
						<p className='font-bold text-text-secondary uppercase'>Current Standing</p>
						<p className='text-error font-bold italic'>Needs Intervention</p>
					</div>
					<button
						onClick={() => setShowPanel(true)}
						className='flex items-center gap-3 bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/30'>
						<Sparkles size={20} />
						Generate Questions
					</button>
				</div>
			</header>
			{showPanel && (
				<GenerateQuestionsPanel
					student={student}
					onClose={() => setShowPanel(false)}
				/>
			)}
		</>
	);
}
