"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MyJob from "@/components/job-item/MyJob";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { userJobs, jobs } = useJobsContext();
  const { isAuth, loading, userProfile } = useGlobalContext();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("posts");

  const userId = userProfile?._id;

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/login`);
    }
  }, [isAuth]);

  if (loading || !userProfile) {
    return <div>Loading...</div>;
  }

  const likedJobs = userId
    ? jobs.filter((job) => job.applicants.includes(userId))
    : [];

  return (
    <div>
      <Header />

      <div className="mt-8 w-[90%] mx-auto flex flex-col">
        <div className="self-center flex items-center gap-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`border cursor-pointer border-gray-400 px-8 py-2 rounded-full font-medium ${
              activeTab === "posts"
                ? "border-transparent bg-indigo-500 text-white"
                : "border-gray-300"
            }`}
          >
            My Job Posts
          </button>
          <button
            onClick={() => setActiveTab("likes")}
            className={`border cursor-pointer border-gray-400 px-8 py-2 rounded-full font-medium ${
              activeTab === "likes"
                ? "border-transparent bg-indigo-500 text-white"
                : "border-gray-300"
            }`}
          >
            Liked Jobs
          </button>
        </div>

        {activeTab === "posts" && userJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="font-bold text-2xl">No job posts found.</p>
          </div>
        )}

        {activeTab === "likes" && likedJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="font-bold text-2xl">No liked jobs found..</p>
          </div>
        )}

        <div className="my-8 grid grid-cols-2 gap-6">
          {activeTab === "posts" &&
            userJobs.map((job) => <MyJob key={job._id} job={job} />)}

          {activeTab === "likes" &&
            likedJobs.map((job) => <MyJob key={job._id} job={job} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
