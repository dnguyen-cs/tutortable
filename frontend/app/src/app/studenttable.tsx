"use client";
import { Student } from '../types/student';
const getStatusColor = (score: number) => {
	if (score >= 90) return 'text-success dark:text-success-dark';
	if (score >= 75) return 'text-warning dark:text-warning-dark';
	if (score < 65) return 'text-error dark:text-error-dark';
	return 'text-text-secondary dark:text-text-secondary-dark';
};

export default function StudentTable({students} : {students: Student[]}) {
	return (
		<div>
			<div className='overflow-hidden rounded-xl border border-border dark:border-border-dark shadow-sm'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='bg-secondary/5 dark:bg-secondary-dark/5 border-b border-border dark:border-border-dark'>
							<th className='p-4 text-left text-text-secondary dark:text-text-secondary-dark font-semibold w-1/3'>
								{`Student Info (${students.length})`}
							</th>
							<th className='p-4 text-left text-text-secondary dark:text-text-secondary-dark font-semibold'>
								Performance Metrics
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-border dark:divide-border-dark'>
						{students.map((student) => (
							<tr
								key={student.id}
								className='bg-card dark:bg-card-dark hover:bg-secondary/5 cursor-pointer active:scale-98'>
								<td className='p-4 align-top'>
									<div className='font-bold text-lg text-text-primary dark:text-primary-dark'>
										{student.name}
									</div>
									<div className='text-sm text-text-secondary dark:text-text-secondary-dark'>
										Grade: {student.grade}
									</div>
								</td>
								<td className='p-4'>
									<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
										{student.mastery_scores &&
											Object.entries(
												student.mastery_scores,
											).map(([subject, score]) => (
												<div
													key={subject}
													className='flex justify-between items-center p-2 rounded bg-background dark:bg-background-dark/50 border border-border/50 dark:border-border-dark/50'>
													<span className='text-sm font-medium dark:text-text-secondary-dark'>
														{subject}:
													</span>
													<span
														className={`font-bold ${getStatusColor(score)}`}>
														{score}
													</span>
												</div>
											))}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
