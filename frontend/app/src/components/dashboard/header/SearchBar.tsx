'use client';
import { Dispatch, SetStateAction } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
	setSearchTerm: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ setSearchTerm }: SearchBarProps) {
	return (
		<div className='relative flex-1'>
			<Search className='absolute left-3 top-3 text-text-secondary w-4 h-4' />
			<input
				type='text'
				placeholder='Search students...'
				className='w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary placeholder-text-primary hover:ring-2 hover:ring-primary/50 transition'
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
}
