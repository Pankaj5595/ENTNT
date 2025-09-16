import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

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
							<button className="inline-flex items-center justify-center rounded-md p-2 text-indigo-700 hover:bg-indigo-100 focus:outline-none">
								<span className="sr-only">Open main menu</span>
								<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
							</button>
						</div>
					</div>
				</div>
				{/* Mobile menu panel can be implemented here if needed */}
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
