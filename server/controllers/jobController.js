import asyncHandler from "express-async-handler";
import { getUserByAuth0Id } from "../services/userService.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { findJobs } from "../services/jobService.js";

export const createJob = asyncHandler(async (req, res) => {
  try {
    const user = await getUserByAuth0Id(req.oidc.user.sub);
    const isAuth = req.oidc.isAuthenticated() || user.email;

    if (!isAuth) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const {
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
    } = req.body;

    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!location) errors.location = "Location is required";
    if (!salary) errors.salary = "Salary is required";
    if (!jobType) errors.jobType = "Job type is required";
    if (!skills) errors.skills = "Skills is required";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const job = new Job({
      title,
      description,
      location,
      salary,
      jobType,
      tags,
      skills,
      salaryType,
      negotiable,
      createdBy: user._id,
    });

    await job.save();

    return res.status(201).json(job);
  } catch (error) {
    console.log("Error in createJob", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({})
      .populate("createdBy", "name profilePicture")
      .sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobs", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export const getJobsByUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const jobs = await Job.find({ createdBy: user.id }).populate(
      "createdBy",
      "name profilePicture"
    );

    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in getJobsByUser", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export const searchJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await findJobs(req.query);
    return res.status(200).json(jobs);
  } catch (error) {
    console.log("Error in searchJobs", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export const applyJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404), json({ message: "Job not found" });
    }

    const user = await getUserByAuth0Id(req.oidc.user.sub);

    if (!user) {
      return res.status(404), json({ message: "User not found" });
    }

    if (job.applicants.includes(user._id)) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    job.applicants.push(user._id);

    await job.save();

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in applyJob", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export const likeJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const user = await getUserByAuth0Id(req.oidc.user.sub);
    if (!user) {
      return res.status(404), json({ message: "User not found" });
    }

    const isLiked = job.likes.includes(user._id);
    if (isLiked) {
      job.likes = job.likes.filter((like) => !like.equals(user._id));
    } else {
      job.likes.push(user._id);
    }

    await job.save();
    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in likeJob", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export const getJobById = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.log("Error in getJobById", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "job not found" });
    }

    const user = await getUserByAuth0Id(req.oidc.user.sub);
    if (!user) {
      return res.status(404), json({ message: "User not found" });
    }

    await job.deleteOne({
      _id: req.params.id,
    });

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.log("Error in getJobById", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});
