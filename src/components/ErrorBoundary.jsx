import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-100 p-2 sm:p-0">
					<div className="max-w-xs sm:max-w-md w-full bg-white rounded-lg shadow-md p-4 sm:p-8">
						<h2 className="text-lg sm:text-2xl font-bold text-red-600 mb-4">
							Something went wrong
						</h2>
						<p className="text-gray-600 mb-4 text-xs sm:text-base">
							{this.state.error?.message || "An unexpected error occurred"}
						</p>
						<button
							onClick={() => window.location.reload()}
							className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full sm:w-auto"
						>
							Reload Page
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
