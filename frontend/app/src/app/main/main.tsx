'use client';
import { useState, useMemo } from 'react';
import Header from './header';
import SearchBar from './searchbar';
import StudentTable from './studenttable';
import AddStudent from './addstudent';
import AddStudentForm from './addstudentform';

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
		<div className='min-h-screen bg-background p-4 md:p-8 '>
			<div className='max-w-4xl mx-auto'>
				<Header />

				{/* Search and Add Student */}
				<div
					className={`${showForm ? '' : 'mb-6'} flex flex-col md:flex-row gap-4`}>
					<SearchBar setSearchTerm={setSearchTerm} />
					<AddStudent toggleForm={{ showForm, setShowForm }} />
				</div>
				{/* TODO: Add API Function */}
				<AddStudentForm showForm={showForm} />
				<StudentTable students={filteredStudents} />
			</div>
		</div>
	);
};

export default TutorTable;
