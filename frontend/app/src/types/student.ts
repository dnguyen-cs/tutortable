export interface Student {
	id: number;
	name: string;
	grade: number;
    mastery_scores: Record<string, number> | null;
}
