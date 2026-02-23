import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_WIDTH = 320;
const MAX_WIDTH = 960;
const DEFAULT_WIDTH = 448; // equivalent to max-w-md

export function useDraggablePanel() {
	const [width, setWidth] = useState(DEFAULT_WIDTH);
	const dragging = useRef(false);
	const startX = useRef(0);
	const startWidth = useRef(0);

	const onDragHandleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			dragging.current = true;
			startX.current = e.clientX;
			startWidth.current = width;
			e.preventDefault();
		},
		[width],
	);

	useEffect(() => {
		const onMouseMove = (e: MouseEvent) => {
			if (!dragging.current) return;
			const delta = startX.current - e.clientX;
			const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta));
			setWidth(next);
		};

		const onMouseUp = () => {
			dragging.current = false;
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
		return () => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};
	}, []);

	return { width, onDragHandleMouseDown };
}
