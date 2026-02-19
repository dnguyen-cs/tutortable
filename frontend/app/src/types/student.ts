export interface Student {
	id: number;
	name: string;
	grade_level: number;
    mastery_scores: Record<string, number> | null;
	mastery_history: Record<string, number> | null;
}
