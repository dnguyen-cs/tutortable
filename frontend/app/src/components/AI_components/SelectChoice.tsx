import { Dispatch, SetStateAction } from 'react';

interface SelectChoiceProps {
	options: string[];
	selectedOption: string;
	setSelectedOption: Dispatch<SetStateAction<string>>;
}
export default function SelectChoice({ options, selectedOption, setSelectedOption }: SelectChoiceProps) {
	return (
		<div>
			<label className='block font-bold text-text-primary mb-3'>Difficulty</label>
			<div className='flex gap-2 flex-wrap'>
				{options.map((selected) => (
					<button
						key={selected}
						onClick={() => setSelectedOption(selected)}
						className={`px-4 py-1.5 rounded-xl text-sm font-bold border-2 transition-colors ${
							selectedOption === selected ?
								'bg-primary text-white border-primary'
							:	'bg-transparent text-text-secondary border-border hover:border-primary/50'
						}`}>
						{selected}
					</button>
				))}
			</div>
		</div>
	);
}
