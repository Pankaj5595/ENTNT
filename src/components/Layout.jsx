import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const loggedInNav = [
	{ name: "Home", href: "/" },
	{ name: "Jobs", href: "/jobs" },
	{ name: "Candidates", href: "/candidates" },
	{ name: "Assessments", href: "/assessments" },
];
const loggedOutNav = [
	{ name: "Home", href: "/" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Layout({ isLoggedIn, setIsLoggedIn }) {
	const navigate = useNavigate();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleSignIn = () => {
		setIsLoggedIn(true);
		navigate("/jobs");
	};
	const handleSignOut = () => {
		setIsLoggedIn(false);
		navigate("/");
	};

	const navLinks = isLoggedIn ? loggedInNav : loggedOutNav;

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						<div className="flex items-center space-x-8">
							<Link to="/" className="text-2xl font-extrabold text-indigo-700 tracking-tight">
								TalentFlow
							</Link>
							<div className="hidden md:flex space-x-6">
								{navLinks.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
						<div className="flex items-center space-x-4">
							{!isLoggedIn ? (
								<>
									<button onClick={handleSignIn} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition">Sign In</button>
									<button className="bg-gray-100 text-indigo-700 px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-100 transition">Sign Up</button>
								</>
							) : (
								<button onClick={handleSignOut} className="bg-gray-100 text-indigo-700 px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-100 transition">Sign Out</button>
							)}
						</div>
						<div className="md:hidden">
							<button
								className="inline-flex items-center justify-center rounded-md p-2 text-indigo-700 hover:bg-indigo-100 focus:outline-none"
								aria-label="Open main menu"
								onClick={() => setMobileMenuOpen(true)}
							>
								<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
				{/* Mobile menu panel */}
				{mobileMenuOpen && (
					<div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end md:hidden">
						<div className="w-3/4 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col">
							<div className="flex items-center justify-between mb-6">
								<span className="text-2xl font-extrabold text-indigo-700">TalentFlow</span>
								<button
									className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
									aria-label="Close menu"
									onClick={() => setMobileMenuOpen(false)}
								>
									<XMarkIcon className="h-6 w-6" />
								</button>
							</div>
							<nav className="flex flex-col space-y-4">
								{navLinks.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-lg font-medium transition-colors"
										onClick={() => setMobileMenuOpen(false)}
									>
										{item.name}
									</Link>
								))}
							</nav>
							<div className="mt-8 flex flex-col space-y-2">
								{!isLoggedIn ? (
									<>
										<button onClick={() => { handleSignIn(); setMobileMenuOpen(false); }} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 transition">Sign In</button>
										<button className="bg-gray-100 text-indigo-700 px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-100 transition">Sign Up</button>
									</>
								) : (
									<button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="bg-gray-100 text-indigo-700 px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-100 transition">Sign Out</button>
								)}
							</div>
						</div>
						<button
							className="absolute inset-0 w-full h-full cursor-default"
							aria-label="Close menu overlay"
							onClick={() => setMobileMenuOpen(false)}
							style={{ background: "transparent", border: "none" }}
						/>
					</div>
				)}
			</nav>

			<main>
				<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default Layout;
