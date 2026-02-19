'use client';
import { Search } from 'lucide-react';
import { useStudents } from '@/hooks/StudentsContext';

export default function SearchBar() {
	const { setSearchTerm } = useStudents();
	return (
		<div className='relative flex-1'>
			<Search className='absolute left-3 top-3 text-text-secondary w-4 h-4' />
			<input
				type='text'
				placeholder='Search students...'
				className='w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-text-primary placeholder-text-primary hover:ring-2 hover:ring-primary/50 transition'
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
}
