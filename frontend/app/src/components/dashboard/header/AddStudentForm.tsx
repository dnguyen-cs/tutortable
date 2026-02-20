'use client';
import { SubmitEvent, useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useStudents } from '@/hooks/StudentsContext';
import { validateGradeLevel, normalizeGradeLevel } from '@/lib/functions';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function AddStudentForm({ showForm }: { showForm: boolean }) {
	const { setStudentsList } = useStudents();
	const [formData, setFormData] = useState({
		name: '',
		grade: '',
		interests: '',
	});

	const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateGradeLevel(formData.grade)) {
			alert('Please enter a valid grade (K-12, Undergraduate, Graduate)');
			return;
		}
		const gradeValue = normalizeGradeLevel(formData.grade);

		const student = {
			name: formData.name,
			grade_level: gradeValue,
			mastery_scores: {},
			mastery_history: {},
			interests: formData.interests.split(',').map((interest) => interest.trim()),
		};

		try {
			const res = await fetch(`${apiURL}/students`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(student),
			});
			if (!res.ok) {
				throw new Error('Failed to add student');
			}
			const data = await res.json();
			setStudentsList((prev) => [...prev, data]);
			setFormData({ name: '', grade: '', interests: '' });
		} catch (err) {
			console.error('Error adding student:', err);
		}
	};
	if (!showForm) return null;

	return (
		<div className={`w-full h-full mb-6 rounded-2xl border-2 border-border p-2`}>
			<form
				onSubmit={(e) => handleSubmit(e)}
				className='flex flex-col'>
				<div className='flex flex-col'>
					<label className='font-bold'>Name</label>
					<input
						required={true}
						type='text'
						placeholder='John Doe'
						className='placeholder:text-text-primary/65'
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						value={formData.name}
					/>
				</div>

				<div className='flex flex-col'>
					<label className='text-lg font-bold ml-1'>Grade</label>
					<input
						required={true}
						type='text'
						placeholder='5'
						className='placeholder:text-text-primary/65'
						onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
						value={formData.grade}
					/>
				</div>

				<div className='flex flex-col'>
					<label className='text-lg font-bold ml-1'>Interests</label>
					<input
						type='text'
						placeholder='Games, Music, Sports'
						className='placeholder:text-text-primary/65'
						onChange={(e) =>
							setFormData({
								...formData,
								interests: e.target.value,
							})
						}
						value={formData.interests}
					/>
				</div>

				<button
					type='submit'
					className='bg-primary text-white font-medium rounded-2xl p-2 px-4 w-fit flex items-center gap-2 mt-2'>
					<SendHorizontal className='w-4 h-4' />
					Submit
				</button>
			</form>
		</div>
	);
}
