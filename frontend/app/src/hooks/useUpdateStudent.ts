import { Student } from '@/types/student';
import { useStudents } from '@/hooks/StudentsContext';
import { validateGradeLevel, normalizeGradeLevel } from '@/lib/functions';

const apiURL = process.env.NEXT_PUBLIC_API_URL;

// Provides functions to update student information, including name, grade level, and mastery scores.
export const useUpdateStudent = (student: Student) => {
	const { setStudentsList } = useStudents();
	const updateStudentAPI = async (updatedFields: Partial<Student>) => {
		const res = await fetch(`${apiURL}/students/${student.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedFields),
		});
		if (!res.ok) throw new Error('Failed to update student');
		return res.json();
	};

	const deleteStudentAPI = async () => {
		const res = await fetch(`${apiURL}/students/${student.id}`, {
			method: 'DELETE',
		});
		if (!res.ok) throw new Error('Failed to delete student');
		return res.json();
	};

	const deleteStudent = async () => {
		if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) return;
		try {
			await deleteStudentAPI();
			setStudentsList((prev) => prev.filter((s) => s.id !== student.id));
		} catch (error) {
			console.error('Error deleting student:', error);
		}
	};

	const handleUpdate = async (updatedFields: Partial<Student>) => {
		try {
			const updatedStudent = await updateStudentAPI(updatedFields);
			setStudentsList((prev) => prev.map((s) => (s.id === student.id ? updatedStudent : s)));
		} catch (error) {
			console.error('Error updating student:', error);
		}
	};

	const changeName = async (newName: string) => {
		await handleUpdate({ name: newName });
	};

	const changeGrade = async (newGrade: string) => {
		if (!validateGradeLevel(newGrade)) {
			alert('Please enter a valid grade (K-12, Undergraduate, Graduate)');
			return;
		}
		const gradeValue = normalizeGradeLevel(newGrade);
		await handleUpdate({ grade_level: gradeValue });
	};

	const addScore = async (subject: string, score: string) => {
		if (!subject || !score) return;

		const numScore = Number(score);
		if (isNaN(numScore) || numScore < 0 || numScore > 100) {
			alert('Score must be a number between 0 and 100');
			return;
		}

		const updatedScores = {
			...student.mastery_scores,
			[subject]: numScore,
		};
		await handleUpdate({ mastery_scores: updatedScores });
	};

	const addScoreWithDate = async (subject: string, score: string, date: string) => {
		if (!subject || !score || !date) return;
		const numScore = Number(score);
		if (isNaN(numScore) || numScore < 0 || numScore > 100) {
			alert('Score must be a number between 0 and 100');
			return;
		}
		const updatedHistory = {
			...student.mastery_history,
			[subject]: {
				...(student.mastery_history[subject] ?? {}),
				[date]: numScore,
			},
		};
		await handleUpdate({ mastery_history: updatedHistory });
	};

	const deleteScore = async (subjectToDelete: string) => {
		if (!student.mastery_scores) return;
		const updatedScores = { ...student.mastery_scores };
		delete updatedScores[subjectToDelete];
		await handleUpdate({ mastery_scores: updatedScores });
	};

	return { changeName, changeGrade, addScore, addScoreWithDate, deleteScore, deleteStudent };
};
