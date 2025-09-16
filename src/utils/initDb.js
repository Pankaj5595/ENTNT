import db from "./db";

export async function initializeDatabase() {
	try {
		await db.open();

		// Check if we need to seed the database
		const jobCount = await db.jobs.count();

		if (jobCount === 0) {
			// Seed initial jobs
			await db.jobs.bulkAdd([
				{
					id: 1,
					title: "Senior React Developer",
					status: "active",
					tags: ["React", "TypeScript", "Remote"],
					description: "We are looking for an experienced React developer...",
					order: 1,
				},
				{
					id: 2,
					title: "UX Designer",
					status: "active",
					tags: ["Figma", "UI/UX", "Hybrid"],
					description: "Seeking a talented UX designer to join our team...",
					order: 2,
				},
			]);
		}

		console.log("Database initialized successfully");
		return true;
	} catch (error) {
		console.error("Failed to initialize database:", error);
		return false;
	}
}
