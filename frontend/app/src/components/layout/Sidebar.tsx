import { LayoutDashboard, User, GraduationCap, Calendar } from 'lucide-react';

export default function Sidebar() {
	return (
		<aside className='hidden md:flex w-16 lg:w-64 border-r border-border flex-col items-center py-8 gap-8 bg-card fixed h-screen transition-all duration-300'>
			<div className='w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20'>
				<GraduationCap size={28} />
			</div>
			<nav className='flex flex-col gap-2 w-full px-2 lg:px-4'>
				<NavItem
					icon={<LayoutDashboard size={20} />}
					label='Overview'
					active
				/>
				<NavItem
					icon={<Calendar size={20} />}
					label='Schedule'
				/>
				<NavItem
					icon={<User size={20} />}
					label='Profile'
				/>
			</nav>
		</aside>
	);
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
	return (
		<div
			className={`flex items-center gap-3 px-2 lg:px-4 py-3 rounded-xl cursor-pointer transition-all justify-center lg:justify-start ${active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-secondary hover:bg-background'}`}>
			{icon}
			<span className='font-bold text-sm hidden lg:inline'>{label}</span>
		</div>
	);
}
