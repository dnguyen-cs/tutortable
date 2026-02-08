'use client';
import { ChangeEvent, useState } from 'react';
import { SendHorizontal } from 'lucide-react';

export default function AddStudentForm({ showForm }: { showForm: boolean }) {
	const [formData, setFormData] = useState({
		name: '',
		grade: '',
		interests: '',
	});

	const validateGrade = (grade: string) => {
		if (grade == 'k') return true;
		const numGrade = parseFloat(grade);
		return Number.isInteger(numGrade) && numGrade > 0 && numGrade <= 12;
	};

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validateGrade(formData.grade)) {
			alert('Please enter a valid grade (K-12)');
			return;
		}
	};

	return (
		<div
			className={`${showForm ? '' : 'hidden'} w-full h-full mb-6 rounded-2xl border-2 border-border p-2`}>
			<form onSubmit={(e) => handleSubmit(e)} className='flex flex-col'>
				<div className='flex flex-col'>
					<label className='font-bold'>Name</label>
					<input
						required={true}
						type='text'
						placeholder='John Doe'
						className='placeholder:text-text-primary/65'
						onChange={(e) =>
							setFormData({ ...formData, name: e.target.value })
						}
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
						onChange={(e) =>
							setFormData({ ...formData, grade: e.target.value })
						}
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
