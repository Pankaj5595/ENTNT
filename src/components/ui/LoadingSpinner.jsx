export default function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center p-2 sm:p-4">
			<div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-indigo-600"></div>
		</div>
	);
}
