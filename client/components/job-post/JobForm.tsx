"use client";

import { useGlobalContext } from "@/context/globalContext";
import React, { useState } from "react";
import JobTitle from "./JobTitle";
import JobDetails from "./JobDetails";
import JobSkills from "./JobSkills";
import JobLocation from "./JobLocation";
import { useJobsContext } from "@/context/jobsContext";

export enum Section {
  About = "About",
  JobDetails = "Job Details",
  Skills = "Skills",
  Location = "Location",
  Summary = "Summary",
}

const JobForm = () => {
  const sections: Section[] = [
    Section.About,
    Section.JobDetails,
    Section.Skills,
    Section.Location,
    Section.Summary,
  ];
  const [currentSection, setCurrentSection] = useState(sections[0]);

  const {
    jobTitle,
    jobDescription,
    salary,
    salaryType,
    activeEmploymentTypes,
    location,
    skills,
    negotiable,
    tags,
  } = useGlobalContext();

  const { createJob } = useJobsContext();

  const renderStages = () => {
    switch (currentSection) {
      case Section.About:
        return <JobTitle />;
      case Section.JobDetails:
        return <JobDetails />;
      case Section.Skills:
        return <JobSkills />;
      case Section.Location:
        return <JobLocation />;
    }
  };

  const getCompletedColor = (section: string) => {
    switch (section) {
      case Section.About:
        return jobTitle && activeEmploymentTypes.length > 0
          ? "bg-indigo-500 text-white"
          : "bg-gray-300";
      case Section.JobDetails:
        return jobDescription && salary > 0
          ? "bg-indigo-500 text-white"
          : "bg-gray-300";
      case Section.Skills:
        return skills.length && tags.length > 0
          ? "bg-indigo-500 text-white"
          : "bg-gray-300";
      case Section.Location:
        return location.address || location.city || location.country
          ? "bg-indigo-500 text-white"
          : "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createJob({
      title: jobTitle,
      description: jobDescription,
      salaryType,
      jobType: activeEmploymentTypes,
      salary,
      location: `${location.address}, ${location.city} ${location.country}`,
      skills,
      negotiable,
      tags,
    });
  };

  return (
    <div className="w-full flex gap-6">
      <div className="self-start w-[10rem] flex flex-col bg-white rounded-md shadow-sm overflow-hidden">
        {sections.map((section, index) => (
          <button
            onClick={() => handleSectionChange(section)}
            key={index}
            className={`pl-4 py-3 cursor-pointer gap-2 relative flex self-start items-center font-medium 
                ${
                  currentSection === section
                    ? "text-indigo-500"
                    : "text-gray-500"
                }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center border border-gray-400/60 justify-center text-gray-500
                ${
                  currentSection === section ? "text-white" : ""
                } ${getCompletedColor(section)}`}
            >
              {index + 1}
            </span>
            {section}
            {currentSection === section && (
              <span className="w-1 h-full rounded-full absolute top-0 left-0 bg-indigo-500"></span>
            )}
          </button>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg self-start flex-1"
      >
        {renderStages()}
        <div className="flex justify-end gap-4 mt-4">
          {currentSection !== Section.Summary && (
            <div>
              <button
                onClick={() => {
                  const currentIndex = sections.indexOf(currentSection);
                  setCurrentSection(sections[currentIndex + 1]);
                }}
                type="button"
                className="px-6 cursor-pointer py-2 bg-indigo-500 text-white rounded-md"
              >
                Next
              </button>
            </div>
          )}
          {currentSection === Section.Summary && (
            <button
              type="submit"
              className="self-end px-6 py-2 cursor-pointer bg-indigo-500 text-white rounded-md"
            >
              Post Job
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobForm;
