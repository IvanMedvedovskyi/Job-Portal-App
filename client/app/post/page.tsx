"use client";
import Header from "@/components/Header";
import JobForm from "@/components/job-post/JobForm";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const { isAuth, loading } = useGlobalContext();

  useEffect(() => {
    if (!isAuth && !loading) {
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/login`);
    }
  }, [isAuth]);

  return (
    <div className="flex flex-col">
      <Header />

      <h2 className="flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black">
        Create a Job Post
      </h2>

      <div className="pt-8 w-[90%] mx-auto flex justify-center items-center">
        <JobForm />
      </div>
    </div>
  );
};

export default page;
