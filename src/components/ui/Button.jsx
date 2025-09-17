const variants = {
	primary: "bg-indigo-600 text-white hover:bg-indigo-700",
	secondary: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300",
	danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs sm:text-sm",
  md: "px-4 py-2 text-sm sm:text-base",
  lg: "px-6 py-3 text-base sm:text-lg",
};

function Button({
	children,
	variant = "primary",
	size = "md",
	className = "",
	...props
}) {
	return (
		<button
			className={`
        ${variants[variant]}
        ${sizes[size]}
        inline-flex items-center justify-center
        font-medium rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
