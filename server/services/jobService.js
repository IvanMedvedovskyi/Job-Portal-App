import Job from "../models/Job.js";

export const findJobs = async ({ tags, location, title }) => {
  const query = {};

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  if (location) {
    query.location = { $regex: location, $options: "i" };
  }

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name profilePicture");
  return jobs;
};
