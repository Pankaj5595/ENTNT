import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JobDetails from "./pages/JobDetails";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import JobsBoard from "./pages/JobsBoard";
import CandidatesPage from "./pages/CandidatesPage";
import AssessmentsPage from "./pages/AssessmentsPage";
import "./App.css";

import { useState } from "react";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
					<Route index element={<HomePage setIsLoggedIn={setIsLoggedIn} />} />
					<Route path="jobs" element={<JobsBoard />} />
					  <Route path="jobs/:jobId" element={<JobDetails />} />
					<Route path="candidates" element={<CandidatesPage />} />
					<Route path="assessments" element={<AssessmentsPage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
