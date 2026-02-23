export interface SubTopic {
	label: string;
	id: string;
}

export interface Topic {
	label: string;
	id: string;
	subTopics: SubTopic[];
}

export const TOPICS: Topic[] = [
	{
		id: 'math',
		label: 'Math',
		subTopics: [
			{ id: 'pre_algebra', label: 'Pre-Algebra' },
			{ id: 'algebra_1', label: 'Algebra 1' },
			{ id: 'algebra_2', label: 'Algebra 2' },
			{ id: 'geometry', label: 'Geometry' },
			{ id: 'trigonometry', label: 'Trigonometry' },
			{ id: 'pre_calculus', label: 'Pre-Calculus' },
			{ id: 'calculus', label: 'Calculus' },
			{ id: 'statistics', label: 'Statistics' },
		],
	},
	{
		id: 'science',
		label: 'Science',
		subTopics: [
			{ id: 'earth_science', label: 'Earth Science' },
			{ id: 'biology', label: 'Biology' },
			{ id: 'chemistry', label: 'Chemistry' },
			{ id: 'physics', label: 'Physics' },
			{ id: 'astronomy', label: 'Astronomy' },
			{ id: 'environmental-science', label: 'Environmental Science' },
			{ id: 'anatomy', label: 'Anatomy & Physiology' },
		],
	},
	{
		id: 'history',
		label: 'History',
		subTopics: [
			{ id: 'us_history', label: 'US History' },
			{ id: 'world_history', label: 'World History' },
			{ id: 'ancient_civilizations', label: 'Ancient Civilizations' },
			{ id: 'european_history', label: 'European History' },
			{ id: 'civics', label: 'Civics & Government' },
			{ id: 'geography', label: 'Geography' },
		],
	},
	{
		id: 'english',
		label: 'English',
		subTopics: [
			{ id: 'grammar', label: 'Grammar & Writing' },
			{ id: 'reading_comprehension', label: 'Reading Comprehension' },
			{ id: 'vocabulary', label: 'Vocabulary' },
			{ id: 'literature', label: 'Literature' },
			{ id: 'creative_writing', label: 'Creative Writing' },
			{ id: 'public_speaking', label: 'Public Speaking' },
		],
	},
	{
		id: 'computer-science',
		label: 'Computer Science',
		subTopics: [
			{ id: 'digital_literacy', label: 'Digital Literacy' },
			{ id: 'intro_programming', label: 'Intro to Programming' },
			{ id: 'web_development', label: 'Web Development' },
			{ id: 'data_structures', label: 'Data Structures' },
			{ id: 'algorithms', label: 'Algorithms' },
			{ id: 'cybersecurity', label: 'Cybersecurity' },
		],
	},
	{
		id: 'art',
		label: 'Art & Music',
		subTopics: [
			{ id: 'art_history', label: 'Art History' },
			{ id: 'music_theory', label: 'Music Theory' },
			{ id: 'visual_arts', label: 'Visual Arts' },
			{ id: 'drama', label: 'Drama & Theater' },
		],
	},
];