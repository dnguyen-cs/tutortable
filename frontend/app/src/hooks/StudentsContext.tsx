'use client';
import { createContext, useContext, useState, useEffect, useMemo, ReactNode, Dispatch, SetStateAction } from 'react';
import { Student } from '../types/student';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface StudentsContextType {
	studentsList: Student[];
	setStudentsList: Dispatch<SetStateAction<Student[]>>;
	filteredStudents: Student[];
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export function StudentsProvider({ children }: { children: ReactNode }) {
	const [studentsList, setStudentsList] = useState<Student[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const res = await fetch(`${apiURL}/students`);
				if (!res.ok) {
					throw new Error('Failed to fetch students');
				}
				const data = await res.json();
				setStudentsList(data);
			}
			catch (error) {
				console.error('Error fetching students:', error);
			} 
			finally {
				setIsLoading(false);
			}
		};
		fetchStudents();
	}, []);

	const filteredStudents = useMemo(() => {
		return studentsList.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()));
	}, [searchTerm, studentsList]);

	return (
		<StudentsContext.Provider
			value={{
				studentsList,
				setStudentsList,
				filteredStudents,
				searchTerm,
				setSearchTerm,
				isLoading,
			}}>
			{children}
		</StudentsContext.Provider>
	);
}

export function useStudents() {
	const context = useContext(StudentsContext);
	if (context === undefined) {
		throw new Error('useStudents must be used within a StudentsProvider');
	}
	return context;
}
