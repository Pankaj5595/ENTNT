import Dexie from "dexie";

export class TalentFlowDB extends Dexie {
	constructor() {
		super("TalentFlowDB");

		this.version(1).stores({
			jobs: "++id, title, status, order",
			candidates: "++id, jobId, name, email, stage",
			assessments: "++id, jobId",
			responses: "++id, assessmentId, candidateId",
			timeline: "++id, candidateId, timestamp",
		});
	}
}

const db = new TalentFlowDB();

export default db;
