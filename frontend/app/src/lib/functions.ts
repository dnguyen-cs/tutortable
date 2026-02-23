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

export const getStatusColor = (score: number) => {
	if (score >= 95) return 'text-success brightness-125';
	if (score >= 90) return 'text-success brightness-100'
	if (score >= 85) return 'text-success brightness-75';
	if (score >= 80) return 'text-warning brightness-125';
	if (score >= 75) return 'text-warning brightness-100';
	if (score >= 70) return 'text-warning brightness-75';
	if (score >= 65) return 'text-error brightness-125';
	if (score >= 60) return 'text-error brightness-100';
	if (score >= 55) return 'text-error brightness-75';
	return 'text-error brightness-50';
};