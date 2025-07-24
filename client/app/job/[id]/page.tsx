"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JobCard from "@/components/job-item/JobCard";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { formatDates } from "@/utils/formatDates";
import { formatMoney } from "@/utils/formatMoney";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { jobs, likeJob, applyToJob } = useJobsContext();
  const { userProfile } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const job = jobs.find((j: Job) => j._id === id);
  const otherJobs = jobs.filter((j: Job) => j._id !== id);

  useEffect(() => {
    if (job && userProfile) {
      setIsLiked(job.likes.includes(userProfile._id));
      setIsApplied(job.applicants.includes(userProfile._id));
    }
  }, [job, userProfile]);

  const handleLikeJob = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  const handleApplyToJob = (id: string) => {
    if (job && userProfile && !job.applicants.includes(userProfile._id)) {
      setIsApplied((prev) => !prev);
    }

    applyToJob(id);
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    title,
    location,
    description,
    salary,
    createdBy,
    applicants,
    jobType,
    createdAt,
    salaryType,
    negotiable,
    likes,
  } = job;

  const { name, profilePicture } = createdBy;

  return (
    <main>
      <Header />

      <div className="p-8 mb-8 mx-auto w-[90%] rounded-md flex gap-8">
        <div className="w-[26%] flex flex-col gap-8">
          <JobCard activeJob job={job} />

          {otherJobs.map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>

        <div className="flex-1 bg-white p-6 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 relative flex items-center rounded-md justify-center bg-gray-200 overflow-hidden">
                  <Image
                    src={profilePicture || "/user.png"}
                    alt={name}
                    width={45}
                    height={45}
                    className="rounded-md"
                  />
                </div>

                <div>
                  <p className="font-bold">{name}</p>
                  <p className="text-sm">Recruiter</p>
                </div>
              </div>
              <button
                onClick={() => handleLikeJob(_id)}
                className={`text-2xl ${
                  isLiked ? "text-indigo-500" : "text-gray-400"
                }`}
              >
                {isLiked ? bookmark : bookmarkEmpty}
              </button>
            </div>

            <h1 className="text-2xl font-semibold">{title}</h1>
            <div className="flex gap-4 items-center">
              <p className="text-gray-500">{location}</p>
            </div>

            <div className="mt-2 flex gap-4 justify-between items-center">
              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-green-500/20 rounded-xl">
                <span className="text-sm">Salary</span>

                <span>
                  <span className="font-bold">
                    {formatMoney(salary, "USD")}
                  </span>
                  <span className="font-medium text-gray-500 text-lg">
                    /
                    {salaryType === "Yealy"
                      ? "pa"
                      : salaryType === "Monthly"
                      ? "pcm"
                      : salaryType === "Weekly"
                      ? "pw"
                      : "ph"}
                  </span>
                </span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-purple-500/20 rounded-xl">
                <span className="text-sm">Posted</span>
                <span className="font-bold">{formatDates(createdAt)}</span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-blue-500/20 rounded-xl">
                <span className="text-sm">Applicants</span>
                <span className="font-bold">{applicants.length}</span>
              </p>

              <p className="flex-1 py-2 px-4 flex flex-col items-center justify-center gap-1 bg-yellow-500/20 rounded-xl">
                <span className="text-sm">Job Type</span>
                <span className="font-bold">{jobType[0]}</span>
              </p>
            </div>

            <h2 className="font-bold text-2xl mt-2">Job Description</h2>
          </div>

          <div
            className="wysiwyg mt-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        <div className="flex flex-col gap-8 w-[26%]">
          <button
            onClick={() => handleApplyToJob(job._id)}
            className={`text-white py-4 cursor-pointer rounded-full hover:bg-indigo-500/90 hover:text-white ${
              isApplied ? "bg-green-500" : "bg-indigo-600"
            }`}
          >
            {isApplied ? "Applied" : "Apply Now"}
          </button>

          <div className="p-6 flex flex-col gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Other information</h3>

            <div className="flex flex-col gap-2">
              <p>
                <span className="font-bold">Posted: </span>
                {formatDates(createdAt)}
              </p>

              <p>
                <span className="font-bold">Salary negotiable: </span>
                <span
                  className={`${
                    negotiable ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {negotiable ? "Yes" : "No"}
                </span>
              </p>

              <p>
                <span className="font-bold">Location: </span>
                {location}
              </p>

              <p>
                <span className="font-bold">Job Type: </span>
                {jobType[0]}
              </p>
            </div>
          </div>

          <div className="flex flex-col p-6 gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Tags</h3>
            <p>Other relevant tags for the job position.</p>

            <div className="flex flex-wrap gap-4">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-red-500/20 text-red-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col p-6 gap-2 bg-white rounded-md">
            <h3 className="text-lg font-semibold">Skills</h3>
            <p>
              This is a {jobType[0].toLowerCase()} position. The successful
              candidate will be responsible for the following:{" "}
            </p>

            <div className="flex flex-wrap gap-4">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-sm font-medium flex items-center bg-indigo-500/20 text-indigo-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Page;
