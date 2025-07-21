"use client";

import Header from "@/components/Header";
import JobCard from "@/components/job-item/JobCard";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const { jobs } = useJobsContext();

  const job = jobs.find((j: Job) => j._id === id);

  if (!job) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Header />

      <div className="p-8 mb-8 mx-auto w-[90%] rounded-md flex gap-8">
        <div className="w-[26%] flex flex-col gap-8">
          <JobCard activeJob job={job} />
        </div>
      </div>
    </div>
  );
};

export default page;
