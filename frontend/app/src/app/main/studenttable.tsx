'use client';
import { Student } from '../../types/student';
import { useRouter } from 'next/navigation';

interface StudentTableProps {
	students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
	const getStatusColor = (score: number) => {
		if (score >= 90) return 'text-success';
		if (score >= 75) return 'text-warning';
		if (score < 65) return 'text-error';
		return 'text-text-secondary';
	};
	
	const router = useRouter();
	const handleStudentClick = (student: Student) => {
		router.push('/student/' + student.id);
		return;
	}

	return (
		<div>
			<div className='overflow-hidden rounded-xl border border-border shadow-sm'>
				<table className='w-full border-collapse'>
					<thead>
						<tr className='bg-secondary/5 border-b border-border'>
							<th className='p-4 text-left text-text-secondary font-semibold w-1/3'>
								{`Student Info (${students.length})`}
							</th>
							<th className='p-4 text-left text-text-secondary font-semibold'>
								Performance Metrics
							</th>
						</tr>
					</thead>
					<tbody className='divide-y divide-border'>
						{students.map((student) => (
							<tr
							onClick={() => handleStudentClick(student)}
								key={student.id}
								className='bg-card hover:bg-secondary/60 cursor-pointer'>
								<td className='p-4 align-top'>
									<div className='font-bold text-lg text-text-primary'>
										{student.name}
									</div>
									<div className='text-sm text-text-secondary'>
										Grade: {student.grade_level}
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
													className='flex justify-between items-center p-2 rounded bg-background border border-border/50 '>
													<span className='text-sm font-medium'>
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
