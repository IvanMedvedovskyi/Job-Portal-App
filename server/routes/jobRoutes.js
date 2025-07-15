import express from "express";
import {
  createJob,
  getJobs,
  getJobsByUser,
} from "../controllers/jobController.js";
import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();

router.post("/jobs", protectMiddleware, createJob);
router.get("/jobs", getJobs);
router.get("/jobs/user/:id", protectMiddleware, getJobsByUser);

export default router;
