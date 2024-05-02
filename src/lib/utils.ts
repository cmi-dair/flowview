export function keyEventWrap<T>(
	handler: () => T,
	keyCode = 13
): (ev: KeyboardEvent) => T | undefined {
	return (ev: KeyboardEvent) => {
		if (ev.keyCode === keyCode) {
			return handler();
		}
	};
}
