import { useState, MouseEvent } from 'react';
import { Student } from '@/types/student';
import { useUpdateStudent } from '@/hooks/useUpdateStudent';

// Manages editing state and operations for a student, including name, grade, and mastery scores.
export const useStudentEditor = (student: Student) => {
	const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
	const [editedName, setEditedName] = useState(student.name);
	const [editedGrade, setEditedGrade] = useState(student.grade_level);
	const [subject, setSubject] = useState('');
	const [score, setScore] = useState('');

	const { changeName, changeGrade, addScore, deleteScore, deleteStudent } = useUpdateStudent(student);

	const handleNameChange = async () => {
		if (editedName.trim() === student.name) return;
		await changeName(editedName);
	};

	const handleGradeChange = async () => {
		if (editedGrade === student.grade_level) return;
		await changeGrade(editedGrade.toString());
	};

	const handleMasteryScoreAdd = async (subject: string, score: string) => {
		if (subject.trim() === '' || score.trim() === '') return;
		await addScore(subject, score);
		setSubject('');
		setScore('');
	};

	const hasNameChanged = editedName.trim() !== student.name;
	const hasGradeChanged = editedGrade !== student.grade_level;
	const hasMasteryScoreValues = subject.trim() !== '' && score.trim() !== '';

	return {
		// Student properties State
		editedName,
		setEditedName,
		editedGrade,
		setEditedGrade,
		// Mastery Scores (Subject, Score)
		handleMasteryScoreAdd,
		subject,
		setSubject,
		score,
		setScore,
		// Editing state
		editingStudentId,
		setEditingStudentId,
		// Handlers
		handleNameChange,
		handleGradeChange,
		// Change flags
		hasNameChanged,
		hasGradeChanged,
		hasMasteryScoreValues,
		// Score operations
		addScore,
		deleteScore,

		//DELETE
		deleteStudent
	};
};
