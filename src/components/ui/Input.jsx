function Input({ label, error, className = "", ...props }) {
	return (
		<div className={className}>
			{label && (
				<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
					{label}
				</label>
			)}
			<input
				className={`
		  block w-full px-3 py-2 
		  border rounded-md shadow-sm
		  text-gray-900 placeholder-gray-400
		  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
		  text-xs sm:text-base
		  ${error ? "border-red-300" : "border-gray-300"}
		`}
				{...props}
			/>
			{error && <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>}
		</div>
	);
}

export default Input;
