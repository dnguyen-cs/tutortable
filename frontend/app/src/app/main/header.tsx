'use client';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/useTheme';
import { useState, useEffect } from 'react';

export default function Header() {
	const [mounted, setMounted] = useState(false);
	const { theme, toggleTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;

	return (
		<div className='flex min-w-full p-8 justify-center'>
			<header className='flex justify-between items-center border-b border-border max-w-4xl w-full'>
				<div className='flex items-center gap-2'>
					<GraduationCap className='text-primary w-8 h-8' />
					<h1 className='text-2xl font-bold text-text-primary'>
						TutorTable
					</h1>
				</div>
				<button
					onClick={toggleTheme}
					className='p-2 rounded-full hover:bg-secondary/25'>
					{theme === 'dark' ? (
						<Sun className='text-warning-dark' />
					) : (
						<Moon className='text-secondary' />
					)}
				</button>
			</header>
		</div>
	);
}
