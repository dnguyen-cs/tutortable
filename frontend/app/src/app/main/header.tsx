'use client';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../lib/useTheme';

export default function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div>
			<header className='flex justify-between items-center mb-8 pb-4 border-b border-border'>
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
