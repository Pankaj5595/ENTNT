import { setupWorker } from "msw";
import { rest } from "msw/rest";
import db from "../utils/db";

// Initialize IndexedDB
db.open().catch((err) => {
	console.error("Failed to open database:", err);
});

// Add artificial delay and error rate to simulate real API
const withLatencyAndErrors = async (ctx, res, callback) => {
	// Simulate network latency (200-1200ms)
	await new Promise((resolve) =>
		setTimeout(resolve, 200 + Math.random() * 1000)
	);

	// Simulate random errors (5-10% error rate)
	if (Math.random() < 0.1) {
		return res(
			ctx.status(500),
			ctx.json({ message: "Server error, please try again" })
		);
	}

	return callback();
};

export const handlers = [
	// Jobs endpoints
	rest.get("/api/jobs", async (req, res, ctx) => {
		return withLatencyAndErrors(ctx, res, async () => {
			const search = req.url.searchParams.get("search") || "";
			const status = req.url.searchParams.get("status");
			const page = parseInt(req.url.searchParams.get("page") || "1");
			const pageSize = parseInt(req.url.searchParams.get("pageSize") || "10");

			let jobs = await db.jobs.toArray();

			if (search) {
				jobs = jobs.filter(
					(job) =>
						job.title.toLowerCase().includes(search.toLowerCase()) ||
						job.tags.some((tag) =>
							tag.toLowerCase().includes(search.toLowerCase())
						)
				);
			}

			if (status && status !== "all") {
				jobs = jobs.filter((job) => job.status === status);
			}

			// Sort by order
			jobs.sort((a, b) => a.order - b.order);

			const total = jobs.length;
			const items = jobs.slice((page - 1) * pageSize, page * pageSize);

			return res(
				ctx.status(200),
				ctx.json({
					items,
					total,
					page,
					pageSize,
					totalPages: Math.ceil(total / pageSize),
				})
			);
		});
	}),

	rest.post("/api/jobs", async (req, res, ctx) => {
		return withLatencyAndErrors(ctx, res, async () => {
			const job = await req.json();
			const id = await db.jobs.add({
				...job,
				order: (await db.jobs.count()) + 1,
			});
			return res(ctx.status(201), ctx.json({ id }));
		});
	}),

	rest.patch("/api/jobs/:id", async (req, res, ctx) => {
		return withLatencyAndErrors(ctx, res, async () => {
			const { id } = req.params;
			const updates = await req.json();
			await db.jobs.update(parseInt(id), updates);
			return res(ctx.status(200));
		});
	}),

	rest.patch("/api/jobs/:id/reorder", async (req, res, ctx) => {
		return withLatencyAndErrors(ctx, res, async () => {
			const { fromOrder, toOrder } = await req.json();
			const jobs = await db.jobs.toArray();

			// Reorder logic
			jobs.forEach((job) => {
				if (fromOrder < toOrder) {
					if (job.order > fromOrder && job.order <= toOrder) {
						db.jobs.update(job.id, { order: job.order - 1 });
					}
				} else {
					if (job.order >= toOrder && job.order < fromOrder) {
						db.jobs.update(job.id, { order: job.order + 1 });
					}
				}
			});

			await db.jobs.update(parseInt(req.params.id), { order: toOrder });
			return res(ctx.status(200));
		});
	}),

	// Candidates endpoints
	rest.get("/api/candidates", async (req, res, ctx) => {
		return withLatencyAndErrors(ctx, res, async () => {
			const search = req.url.searchParams.get("search") || "";
			const stage = req.url.searchParams.get("stage");
			const page = parseInt(req.url.searchParams.get("page") || "1");
			const pageSize = parseInt(req.url.searchParams.get("pageSize") || "10");

			let candidates = await db.candidates.toArray();

			if (search) {
				candidates = candidates.filter(
					(candidate) =>
						candidate.name.toLowerCase().includes(search.toLowerCase()) ||
						candidate.email.toLowerCase().includes(search.toLowerCase())
				);
			}

			if (stage) {
				candidates = candidates.filter(
					(candidate) => candidate.stage === stage
				);
			}

			const total = candidates.length;
			const items = candidates.slice((page - 1) * pageSize, page * pageSize);

			return res(
				ctx.status(200),
				ctx.json({
					items,
					total,
					page,
					pageSize,
					totalPages: Math.ceil(total / pageSize),
				})
			);
		});
	}),

	// ... add more endpoints for assessments and other features
];

const worker = setupWorker(...handlers);
export default worker;
