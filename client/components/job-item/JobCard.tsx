"use client";

import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { Bookmark, Calendar } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { formatMoney } from "@/utils/formatMoney";
import { formatDates } from "@/utils/formatDates";
import { bookmark, bookmarkEmpty } from "@/utils/Icons";

interface JobCardProps {
  job: Job;
  activeJob?: boolean;
}

const JobCard: FC<JobCardProps> = ({ job, activeJob }) => {
  const { likeJob } = useJobsContext();
  const { isAuth, userProfile } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const {
    title,
    location,
    salaryType,
    salary,
    createdAt,
    applicants,
    jobType,
    createdBy,
  } = job;

  const { name, profilePicture } = createdBy;

  const companyDescription = `${name} is hiring for ${title} in ${location}`;

  const jobTypeBackground = (type: string) => {
    switch (type) {
      case "Full Time":
        return "bg-green-500/20 text-green-600";
      case "Part Time":
        return "bg-purple-500/20 text-purple-600";
      case "Contract":
        return "bg-red-500/20 text-red-600";
      case "Internship":
        return "bg-indigo-500/20 text-indigo-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  useEffect(() => {
    if (job && userProfile) {
      setIsLiked(job.likes.includes(userProfile._id));
    }
  }, [job.likes, userProfile]);

  const handleLike = (id: string) => {
    setIsLiked((prev) => !prev);
    likeJob(id);
  };

  return (
    <div
      className={`p-8 rounded-xl flex flex-col gap-5 ${
        activeJob
          ? "bg-gray-50 shadow-md border-b-2 border-indigo-500"
          : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => router.push(`/job/${job._id}`)}
        >
          <Image
            src={profilePicture || "/user.png"}
            alt={name}
            width={48}
            height={48}
            className="rounded-full shadow"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-sm text-gray-500">
              {name}: {applicants.length}{" "}
              {applicants.length === 1 ? "Applicant" : "Applicants"}
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            isAuth
              ? handleLike(job._id)
              : router.push(`${process.env.NEXT_PUBLIC_API_URL}/login`)
          }
          className={`text-2xl ${
            isLiked ? "text-indigo-500" : "text-gray-400"
          }`}
        >
          {isLiked ? bookmark : bookmarkEmpty}
        </button>
      </div>

      {jobType.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {jobType.map((type, index) => (
            <span
              key={index}
              className={`py-1 px-3 text-xs font-medium rounded-md border ${jobTypeBackground(
                type
              )}`}
            >
              {type}
            </span>
          ))}
        </div>
      )}

      {/* Описание */}
      <p className="text-sm text-gray-600">
        {companyDescription.length > 100
          ? `${companyDescription.substring(0, 100)}...`
          : companyDescription}
      </p>

      <Separator />

      {/* Зарплата и дата */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-black">
          {formatMoney(salary, "USD")}
          <span className="ml-1 text-sm font-medium text-gray-500">
            {salaryType === "Yealy"
              ? "pa"
              : salaryType === "Monthly"
              ? "pcm"
              : salaryType === "Weekly"
              ? "pw"
              : "ph"}
          </span>
        </p>

        <p className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar size={16} />
          Posted: {formatDates(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
