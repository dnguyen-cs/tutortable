'use client';
import { useState, useMemo, useEffect } from 'react';
import SearchBar from './searchbar';
import StudentTable from './studenttable';
import AddStudent from './addstudent';
import AddStudentForm from './addstudentform';

import { Student } from '../../types/student';
const apiURL = process.env.NEXT_PUBLIC_API_URL;

const TutorTable = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [studentsList, setStudentsList] = useState<Student[]>([]);

	useEffect(() => {
		const fetchStudents = async () => {
			const res = await fetch(`${apiURL}/api/students`);
			const data = await res.json();
			setStudentsList(data);
		};
		fetchStudents();
	}, []);

	const filteredStudents = useMemo(() => {
		return studentsList.filter((student) =>
			student.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
	}, [searchTerm, studentsList]);

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Search and Add Student Button */}
			<div
				className={`${showForm ? '' : 'mb-6'} flex flex-col md:flex-row gap-4`}>
				<SearchBar setSearchTerm={setSearchTerm} />
				<AddStudent toggleForm={{ showForm, setShowForm }} />
			</div>

			<AddStudentForm
				showForm={showForm}
				updateStudents={setStudentsList}
			/>
			<StudentTable students={filteredStudents} />
		</div>
	);
};

export default TutorTable;
