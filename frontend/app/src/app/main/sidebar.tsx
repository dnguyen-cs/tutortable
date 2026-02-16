import { LayoutDashboard, User, Settings, GraduationCap, Calendar } from 'lucide-react';

export default function Sidebar() {
	return (
		<aside className='md:flex w-64 border-r border-border flex-col items-center py-8 gap-8 bg-card fixed h-screen'>
			<div className='w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20'>
				<GraduationCap size={28} />
			</div>
			<nav className='flex flex-col gap-2 w-full px-4'>
				<NavItem
					icon={<LayoutDashboard size={20} />}
					label='Overview'
					active
				/>
				<NavItem
					icon={<User size={20} />}
					label='Student List'
				/>
				<NavItem
					icon={<Calendar size={20} />}
					label='Schedule'
				/>
				<NavItem
					icon={<Settings size={20} />}
					label='Settings'
				/>
			</nav>
		</aside>
	);
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
	return (
		<div
			className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-secondary hover:bg-background'}`}>
			{icon}
			<span className='font-bold text-sm'>{label}</span>
		</div>
	);
}
