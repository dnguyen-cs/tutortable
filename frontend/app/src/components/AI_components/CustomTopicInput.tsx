'use client';
import { useRef, useState } from 'react';
import { X, Plus } from 'lucide-react';

interface CustomTopicInputProps {
	customTopics: string[];
	onAdd: (topic: string) => void;
	onRemove: (topic: string) => void;
}

export default function CustomTopicInput({ customTopics, onAdd, onRemove }: CustomTopicInputProps) {
	const [input, setInput] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAdd = () => {
		const trimmed = input.trim();
		if (!trimmed || customTopics.includes(trimmed)) return;
		onAdd(trimmed);
		setInput('');
		inputRef.current?.focus();
	};

	return (
		<div>
			<label className='block font-bold text-text-primary mb-3'>Custom Topic</label>
			<div className='flex gap-2'>
				<input
					ref={inputRef}
					type='text'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
					placeholder='e.g. Greek Mythology'
					className='flex-1 bg-background border-2 border-border rounded-xl px-4 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary'
				/>
				<button
					onClick={handleAdd}
					disabled={!input.trim()}
					className='flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl shadow shadow-primary/30 disabled:opacity-40 disabled:cursor-not-allowed shrink-0'>
					<Plus size={15} />
					Add
				</button>
			</div>
			{customTopics.length > 0 && (
				<div className='flex flex-wrap gap-2 mt-3'>
					{customTopics.map((topic) => (
						<span
							key={topic}
							className='flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-xl'>
							{topic}
							<button
								onClick={() => onRemove(topic)}
								className='hover:text-white/70'>
								<X size={12} />
							</button>
						</span>
					))}
				</div>
			)}
		</div>
	);
}
