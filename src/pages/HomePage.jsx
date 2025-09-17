import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";

function HomePage({ setIsLoggedIn }) {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const [userType, setUserType] = useState(null);
	const navigate = useNavigate();

	const handleSignIn = (e) => {
		e.preventDefault();
		setIsLoggedIn(true);
		navigate("/jobs");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
			<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
						Welcome to{' '}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
							TalentFlow
						</span>
					</h1>
					<p className="mt-3 max-w-md sm:max-w-2xl mx-auto text-base sm:text-lg md:mt-5 md:text-xl text-gray-700">
						TalentFlow is your all-in-one hiring solution designed for modern teams and ambitious job seekers. Effortlessly manage job postings, track candidates through every stage, and create smart assessments to find the perfect fit. Our intuitive platform streamlines recruitment, saves time, and helps you build winning teams with confidence.<br /><br />
						<span className="font-semibold text-indigo-700">For Recruiters:</span> Post jobs, organize candidates with drag-and-drop kanban boards, and automate assessments for faster, smarter hiring.<br />
						<span className="font-semibold text-purple-700">For Job Seekers:</span> Discover opportunities, apply with one click, and showcase your skills through interactive assessments.<br /><br />
						Join TalentFlow and experience the future of hiring—where simplicity meets power.
					</p>

					<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4 justify-center">
						<Button
							size="lg"
							className="w-full sm:w-auto"
							onClick={() => {
								setUserType("recruiter");
								setIsSignInModalOpen(true);
							}}
						>
							Sign in as Recruiter
						</Button>
						<Button
							size="lg"
							variant="secondary"
							className="w-full sm:w-auto"
							onClick={() => {
								setUserType("candidate");
								setIsSignInModalOpen(true);
							}}
						>
							Sign in as Job Seeker
						</Button>
					</div>

					{/* Features Section */}
					<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						<div className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
							<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
								{/* ...existing code... */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-indigo-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900 text-center">
								Job Management
							</h3>
							<p className="mt-2 text-sm text-gray-500 text-center">
								Create, edit, and manage job postings with ease. Use drag-and-drop to prioritize positions.
							</p>
						</div>

						<div className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
							<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
								{/* ...existing code... */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-indigo-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900 text-center">
								Candidate Tracking
							</h3>
							<p className="mt-2 text-sm text-gray-500 text-center">
								Track candidates through hiring stages with our intuitive kanban board interface.
							</p>
						</div>

						<div className="p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center">
							<div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
								{/* ...existing code... */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-indigo-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900 text-center">
								Smart Assessments
							</h3>
							<p className="mt-2 text-sm text-gray-500 text-center">
								Create custom assessments with various question types and automated scoring.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Sign In Modal */}
			<Modal
				isOpen={isSignInModalOpen}
				onClose={() => setIsSignInModalOpen(false)}
				title={`Sign in as ${userType === "recruiter" ? "Recruiter" : "Job Seeker"}`}
			>
				<div className="flex flex-col items-center space-y-6 py-6">
					<Button
						size="lg"
						className="w-full"
						onClick={handleSignIn}
					>
						Continue as {userType === "recruiter" ? "Recruiter" : "Job Seeker"}
					</Button>
					<Button
						type="button"
						variant="secondary"
						className="w-full"
						onClick={() => setIsSignInModalOpen(false)}
					>
						Cancel
					</Button>
				</div>
			</Modal>
		</div>
	);
}

export default HomePage;
