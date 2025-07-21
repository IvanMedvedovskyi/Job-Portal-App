"use client";
import React, { FC } from "react";
import { Job } from "@/types/types";
import { useJobsContext } from "@/context/jobsContext";
import Image from "next/image";
import { CardTitle } from "../ui/card";
import { formatDates } from "@/utils/formatDates";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobProps {
  job: Job;
}

const MyJob: FC<JobProps> = ({ job }) => {
  const { deleteJob } = useJobsContext();

  const router = useRouter();

  return (
    <div className="p-8 bg-white rounded-xl flex flex-col gap-5  cursor-pointer">
      <div
        onClick={() => router.push(`/job/${job._id}`)}
        className="flex items-center space-x-4 mb-2"
      >
        <Image
          alt="logo"
          src={job.createdBy.profilePicture || "/user.png"}
          width={48}
          height={48}
          className="rounded-full"
        />

        <div>
          <CardTitle className="text-xl font-bold truncate">
            {job.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{job.createdBy.name}</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
        <p className="text-sm text-muted-foreground mb-4">
          Posted {formatDates(job.createdAt)}
        </p>

        <div className="flex justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills.map((skill, index) => (
                <Badge variant={"secondary"} key={index}>
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, index) => (
                <Badge variant={"outline"} key={index}>
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="self-end">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 cursor-pointer"
            >
              <Pencil size={14} />
              <span className="sr-only">Edit job</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteJob(job._id)}
              className="text-gray-500 hover:text-red-500 cursor-pointer"
            >
              <Trash size={14} />
              <span className="sr-only">Delete job</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJob;
