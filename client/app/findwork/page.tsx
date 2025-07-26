"use client";

import Filters from "@/components/Filters";
import Header from "@/components/Header";
import JobCard from "@/components/job-item/JobCard";
import SearchForm from "@/components/SearchForm";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { grip, list, table } from "@/utils/Icons";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const { jobs, filters, minSalary, maxSalary } = useJobsContext();
  const [columns, setColumns] = useState(3);

  const toggleGridColumns = () => {
    setColumns((prev) => (prev === 3 ? 2 : prev === 2 ? 1 : 3));
  };

  const getIcon = () => {
    if (columns === 3) return grip;
    if (columns === 2) return table;

    return list;
  };

  const filteredJobs =
    filters.backend ||
    filters.contract ||
    filters.devOps ||
    filters.fullStack ||
    filters.fullTime ||
    filters.internship ||
    filters.partTime ||
    filters.uiux ||
    minSalary > 0 ||
    maxSalary < 200000
      ? jobs.filter((job: Job) => {
          const salary = Number(job.salary);

          const matchesJobType =
            (filters.fullTime && job.jobType.includes("Full Time")) ||
            (filters.partTime && job.jobType.includes("Part Time")) ||
            (filters.contract && job.jobType.includes("Contract")) ||
            (filters.internship && job.jobType.includes("Internship"));

          const matchesTags =
            (filters.fullStack && job.tags.includes("Full Stack")) ||
            (filters.backend && job.tags.includes("Backend")) ||
            (filters.devOps && job.tags.includes("DevOps")) ||
            (filters.uiux && job.tags.includes("UI/UX"));

          const matchesSalary =
            !isNaN(salary) && salary >= minSalary && salary <= maxSalary;

          return matchesJobType || matchesTags || matchesSalary;
        })
      : jobs;

  return (
    <main>
      <Header />

      <div className="relative px-16 overflow-hidden bg-gray-200">
        <h1 className="py-8 text-black font-bold text-3xl">
          Find Your Next Job Here
        </h1>

        <div className="pb-8 relative z-10">
          <SearchForm />
        </div>

        <Image
          src="/woman-on-phone.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path w-[15rem] absolute z-0 top-[0] right-[10rem] h-full object-cover"
        />

        <Image
          src="/woman-on-phone.jpg"
          alt="hero"
          width={200}
          height={500}
          className="clip-path-2 rotate-6 w-[15rem] absolute z-0 top-[0] right-[32rem] h-full object-cover"
        />
      </div>

      <div className="w-[90%] mx-auto mb-14">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-black py-8">Recent Jobs</h2>

          <button
            className="cursor-pointer flex gap-4 items-center border border-gray-400 px-8 py-2 rounded-full font-medium"
            onClick={toggleGridColumns}
          >
            <span>
              {columns === 3
                ? "Grid View"
                : columns === 2
                ? "Table View"
                : "List View"}
            </span>
            <span className="text-lg">{getIcon()}</span>
          </button>
        </div>

        <div className="flex gap-8 ">
          <Filters />

          <div
            className={`self-start flex-1 grid gap-8 ${
              columns === 3
                ? "grid-cols-3"
                : columns === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {jobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <div className="mt-1 flex items-center">
                <p className="text-2xl text-gray-400 font-bold">
                  No Jobs Found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
