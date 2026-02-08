'use client';
import { useState, useMemo } from 'react';
import { useTheme } from '../../lib/useTheme';
import Header from './header';
import SearchBar from './searchbar';
import StudentTable from './studenttable';
import AddStudent from './addstudent';
import { SendHorizontal } from 'lucide-react';

import { Student } from '../types/student';

const MOCK_STUDENTS: Student[] = [
	{
		id: 1,
		name: 'Student 1',
		grade: 5,
		mastery_scores: {
			Fractions: 85,
			Decimals: 95,
			Volume: 75,
			Geometry: 50,
		},
	},
	{
		id: 2,
		name: 'Student 2',
		grade: 6,
		mastery_scores: {
			A: 90,
			B: 91,
			C: 92,
			D: 93,
			E: 94,
			F: 95,
			G: 96,
			H: 97,
			I: 98,
			J: 99,
			K: 100,
		},
	},
];

const TutorTable = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [showForm, setShowForm] = useState(false);

	const filteredStudents = useMemo(() => {
		return MOCK_STUDENTS.filter((student) =>
			student.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm, MOCK_STUDENTS]);

	return (
		<div className='min-h-screen bg-background dark:bg-background p-4 md:p-8 '>
			<div className='max-w-4xl mx-auto'>
				<Header />

				{/* Search and Add Student */}
				<div className='flex flex-col md:flex-row gap-4 mb-6'>
					<SearchBar setSearchTerm={setSearchTerm} />
					<AddStudent toggleForm={{showForm, setShowForm}}/>
				</div>
				{/* TODO: Add API Function */}
				<div className={`${showForm ? "" : "hidden"} w-full h-full mb-6 rounded-2xl`}>
					<form onSubmit={(e) => {e.preventDefault(); console.log(e.target)}} className='flex flex-col'>
						<input type='text' placeholder='Name' />
						<input type='text' placeholder='Grade' />
						<input type='text' placeholder='Interests' />
						<button
							type='submit'
							className='bg-primary dark:bg-primary text-white dark:text-background font-medium rounded-2xl p-2 px-4 w-fit flex items-center gap-2'>
							<SendHorizontal className='w-4 h-4' />
							Submit
						</button>
					</form>
				</div>
				<StudentTable students={filteredStudents} />
			</div>
		</div>
	);
};

export default TutorTable;
