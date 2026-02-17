import { Dispatch, SetStateAction } from 'react';
import { Student } from '../../../../types/student';

export const useMasteryScores = (student: Student, updateStudents: Dispatch<SetStateAction<Student[]>>) => {
	const updateStudentAPI = async (newScores: Record<string, number>) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${student.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mastery_scores: newScores }),
		});

		if (!res.ok) throw new Error('Failed to update student');
		return res.json();
	};

	const handleUpdate = async (newScores: Record<string, number>) => {
		try {
			const updatedStudent = await updateStudentAPI(newScores);
			updateStudents((prev) => prev.map((s) => (s.id === student.id ? updatedStudent : s)));
		} catch (error) {
			console.error('Error updating scores:', error);
		}
	};

	const addScore = async (subject: string, score: string) => {
		const updatedScores = {
			...student.mastery_scores,
			[subject]: Number(score),
		};
		await handleUpdate(updatedScores);
	};

	const deleteScore = async (subjectToDelete: string) => {
		if (!student.mastery_scores) return;
		const updatedScores = { ...student.mastery_scores };
		delete updatedScores[subjectToDelete];
		await handleUpdate(updatedScores);
	};

	return { addScore, deleteScore };
};
