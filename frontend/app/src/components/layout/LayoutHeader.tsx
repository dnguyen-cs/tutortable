'use client';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
	const [mounted, setMounted] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;

	return (
		<div className='flex min-w-full justify-center sticky top-0 z-50 bg-background'>
			<header className='flex justify-between items-center border-b border-border w-full p-2'>
				<div
					onClick={() => router.push('/')}
					className='flex items-center gap-2 cursor-pointer hover:scale-102 hover:opacity-90 transition ease-in-out duration-300'>
					<GraduationCap className='text-primary w-8 h-8' />
					<h1 className='text-2xl font-bold text-text-primary'>TutorTable</h1>
				</div>
				<button
					onClick={toggleTheme}
					className='p-2 rounded-full hover:bg-secondary/25'>
					{theme === 'dark' ?
						<Sun className='text-warning-dark' />
					:	<Moon className='text-secondary' />}
				</button>
			</header>
		</div>
	);
}
