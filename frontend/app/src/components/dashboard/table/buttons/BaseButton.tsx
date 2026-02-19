export default function BaseButton({
	children,
	onClick,
	className,
}: {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
}) {
	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			className={`rounded px-4 py-1 text-white font-medium ${className ?? ''}`}>
			{children}
		</button>
	);
}
