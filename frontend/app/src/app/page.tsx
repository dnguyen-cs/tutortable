"use client";
import dynamic from 'next/dynamic';

const TutorTable = dynamic(() => import('./main/main'), { 
  ssr: false,
  loading: () => <p>Loading...</p>
});

export default function Home() {
  return <TutorTable />;
}