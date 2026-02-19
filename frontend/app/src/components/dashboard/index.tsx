'use client';
import { useState } from 'react';
import SearchBar from './header/SearchBar';
import StudentTable from './table/StudentTable';
import AddStudentButton from './header/AddStudent';
import AddStudentForm from './header/AddStudentForm';
import { StudentsProvider } from '@/hooks/StudentsContext';

// TODO Fix dashboard (student/[id]/page.tsx) and enable sidebar functionality.
// TODO Add option to delete a mastery score from mastery history and update the chart accordingly. | student/[id]/page.tsx)
// TODO Integrade AI button
// TODO AWS Cognito
// TODO student/[id]/page.tsx - add logic for CURRENT STANDING
// TODO student/[id]/page.tsx - add logic for RECENT SESSIONS
const TutorTableContent = () => {
	const [showForm, setShowForm] = useState(false);

	return (
		<div className='max-w-7xl mx-auto p-4 md:p-10'>
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
