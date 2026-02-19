
export const validateGradeLevel = (gradeLevel: string): boolean => {
	const validStrings = ['K', 'Kindergarten', 'UNDERGRADUATE', 'GRADUATE'];
	if (validStrings.includes(gradeLevel.toUpperCase())) return true;

	const numGrade = parseFloat(gradeLevel);
	return Number.isInteger(numGrade) && numGrade > 0 && numGrade <= 12;
};

export const normalizeGradeLevel = (grade: string) => {
	const gradeMap: Record<string, number> = {
		K: 0,
		KINDERGARTEN: 0,
		UNDERGRADUATE: 13,
		GRADUATE: 14,
	};
	const normalizedInput = grade.toUpperCase();
	const gradeValue = gradeMap[normalizedInput] ?? parseInt(grade, 10);
    return gradeValue;
};