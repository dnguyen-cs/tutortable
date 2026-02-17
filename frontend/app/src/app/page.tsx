'use client';
import dynamic from 'next/dynamic';
const TutorTable = dynamic(() => import('../components/dashboard/Main'), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

export default function Home() {
	return <TutorTable />;
}
