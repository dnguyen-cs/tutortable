import { Dispatch, SetStateAction } from 'react';
import { Student } from '../../../../types/student';

export const useUpdateStudent = (student: Student, updateStudents: Dispatch<SetStateAction<Student[]>>) => {
	const updateStudentAPI = async (updatedFields: Partial<Student>) => {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students/${student.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedFields),
		});
		if (!res.ok) throw new Error('Failed to update student');
		return res.json();
	};

	const handleUpdate = async (updatedFields: Partial<Student>) => {
		try {
			const updatedStudent = await updateStudentAPI(updatedFields);
			updateStudents((prev) => prev.map((s) => (s.id === student.id ? updatedStudent : s)));
		} catch (error) {
			console.error('Error updating student:', error);
		}
	};

	const changeName = async (newName: string) => {
		await handleUpdate({ name: newName });
	};

	const changeGrade = async (newGrade: string) => {
		if (!validateGrade(newGrade)) {
			alert('Please enter a valid grade (K-12, Undergraduate, Graduate)');
			return;
		}
        const gradeValue = normalizeGrade(newGrade);
		await handleUpdate({ grade_level: gradeValue });
	};

	const addScore = async (subject: string, score: string) => {
		const updatedScores = {
			...student.mastery_scores,
			[subject]: Number(score),
		};
		await handleUpdate({mastery_scores : updatedScores});
	};

	const deleteScore = async (subjectToDelete: string) => {
		if (!student.mastery_scores) return;
		const updatedScores = { ...student.mastery_scores };
		delete updatedScores[subjectToDelete];
		await handleUpdate({mastery_scores : updatedScores});
	};

    return { changeName, changeGrade, addScore, deleteScore };
};

const validateGrade = (grade: string) => {
	const validStrings = ['K', 'UNDERGRADUATE', 'GRADUATE'];
	if (validStrings.includes(grade.toUpperCase())) return true;

	const numGrade = parseFloat(grade);
	return Number.isInteger(numGrade) && numGrade > 0 && numGrade <= 12;
};

const normalizeGrade = (grade: string) => {
	const gradeMap: Record<string, number> = {
		K: 0,
		UNDERGRADUATE: 13,
		GRADUATE: 14,
	};
	const normalizedInput = grade.toUpperCase();
	const gradeValue = gradeMap[normalizedInput] ?? parseInt(grade, 10);
    return gradeValue;
};
