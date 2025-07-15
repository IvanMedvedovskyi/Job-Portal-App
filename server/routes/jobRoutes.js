import express from "express";
import {
  createJob,
  getJobs,
  getJobsByUser,
  searchJobs,
  applyJob,
  likeJob,
  getJobById,
  deleteJob,
} from "../controllers/jobController.js";

import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();

router.post("/jobs", protectMiddleware, createJob);
router.get("/jobs", getJobs);
router.get("/jobs/user/:id", protectMiddleware, getJobsByUser);

// Search jobs
router.get("/jobs/search", searchJobs);

// Apply for job
router.put("/jobs/apply/:id", protectMiddleware, applyJob);

// Like and unlike
router.put("/jobs/like/:id", protectMiddleware, likeJob);

// get job by id
router.get("/jobs/:id", protectMiddleware, getJobById);

// delete job
router.delete("/jobs/:id", protectMiddleware, deleteJob);

export default router;
