import type { Metadata } from 'next';
import { fira_code } from '@/lib/fonts';
import './globals.css';
import Header from '@/components/layout/LayoutHeader';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
	title: 'Tutor Table',
	description: 'A tutoring management platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${fira_code.className} antialiased`}>
				<Header />
				<Sidebar />
				<main className='md:ml-16 lg:ml-64'>{children}</main>
			</body>
		</html>
	);
}
