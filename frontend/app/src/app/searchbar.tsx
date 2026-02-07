"use client";
import { Dispatch, useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({setSearchTerm} : {setSearchTerm: Dispatch<React.SetStateAction<string>>}) {
	return (
		<div className='relative flex-1'>
			<Search className='absolute left-3 top-3 text-text-secondary w-4 h-4' />
			<input
				type='text'
				placeholder='Search students...'
				className='w-full pl-10 pr-4 py-2 bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-text-primary dark:text-text-primary-dark placeholder-text-primary dark:placeholder-text-primary-dark hover:ring-2 hover:ring-primary/50 transition'
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
}