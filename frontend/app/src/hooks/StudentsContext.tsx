'use client';
import { createContext, useContext, useState, useEffect, useMemo, ReactNode, Dispatch, SetStateAction } from 'react';
import { Student } from '../types/student';

export type SortKey = 'name' | 'date_created';
export type SortDir = 'asc' | 'desc';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

interface StudentsContextType {
	studentsList: Student[];
	setStudentsList: Dispatch<SetStateAction<Student[]>>;
	filteredStudents: Student[];
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
	isLoading: boolean;
	error: string | null;
	sortKey: SortKey;
	sortDir: SortDir;
	setSort: (key: SortKey) => void;
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export function StudentsProvider({ children }: { children: ReactNode }) {
	const [studentsList, setStudentsList] = useState<Student[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [sortKey, setSortKey] = useState<SortKey>('name');
	const [sortDir, setSortDir] = useState<SortDir>('asc');

	const setSort = (key: SortKey) => {
		if (key === sortKey) {
			setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortKey(key);
			setSortDir('asc');
		}
	};

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const res = await fetch(`${apiURL}/students`);
				if (!res.ok) {
					throw new Error('Failed to fetch students');
				}
				const data = await res.json();
				setStudentsList(data);
				setError(null);
			} catch (error) {
				console.error('Error fetching students:', error);
				setError(error instanceof Error ? error.message : 'Unknown error');
			} finally {
				setIsLoading(false);
			}
		};
		fetchStudents();
	}, []);

	const filteredStudents = useMemo(() => {
		const filtered = studentsList.filter((student) =>
			student.name.toLowerCase().includes(searchTerm.toLowerCase()),
		);
		return [...filtered].sort((a, b) => {
			let cmp = 0;
			if (sortKey === 'name') {
				cmp = a.name.localeCompare(b.name);
			} else {
				cmp = new Date(a.date_created).getTime() - new Date(b.date_created).getTime();
			}
			return sortDir === 'asc' ? cmp : -cmp;
		});
	}, [searchTerm, studentsList, sortKey, sortDir]);

	return (
		<StudentsContext.Provider
			value={{
				studentsList,
				setStudentsList,
				filteredStudents,
				searchTerm,
				setSearchTerm,
				isLoading,
				error,
				sortKey,
				sortDir,
				setSort,
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
