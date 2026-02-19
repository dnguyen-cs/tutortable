'use client';
import { useState } from 'react';
import SearchBar from './header/SearchBar';
import StudentTable from './table/StudentTable';
import AddStudentButton from './header/AddStudent';
import AddStudentForm from './header/AddStudentForm';
import { StudentsProvider } from '@/hooks/StudentsContext';

// TODO Fix dashboard (student/[id]/page.tsx) and enable sidebar functionality.
// TODO Add API fetching for StudentDashboard
const TutorTableContent = () => {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className='flex-1 p-4 md:p-6 lg:p-10 md:ml-16 lg:ml-64 max-w-7xl mx-auto'>
			<div className={`${showForm ? '' : 'mb-6'} flex flex-col md:flex-row gap-4`}>
				<SearchBar />
				<AddStudentButton toggleForm={{ showForm, setShowForm }} />
			</div>

			<AddStudentForm showForm={showForm} />
			<StudentTable />
		</div>
	);
};

const TutorTable = () => {
	return (
		<StudentsProvider>
			<TutorTableContent />
		</StudentsProvider>
	);
};

export default TutorTable;
