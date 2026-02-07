"use client";
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/useTheme';
import { useEffect, useState } from 'react';

export default function Header() {
	const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

	return (
		<div>
			<header className='flex justify-between items-center mb-8 pb-4 border-b border-border dark:border-border-dark'>
				<div className='flex items-center gap-2'>
					<GraduationCap className='text-primary dark:text-primary-dark w-8 h-8  ' />
					<h1 className='text-2xl font-bold text-text-primary dark:text-text-primary-dark  '>
						TutorTable
					</h1>
				</div>
				<button
					onClick={toggleTheme}
					className='p-2 rounded-full hover:bg-secondary/10 dark:hover:bg-secondary-dark/20  '>
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
