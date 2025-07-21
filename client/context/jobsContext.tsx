"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { GlobalContextProvider, useGlobalContext } from "./globalContext";
import axios from "axios";
import { CreateJobPayload } from "@/types/payload";
import toast from "react-hot-toast";
import { Job } from "@/types/types";

interface JobsContextProps {
  jobs: Job[];
  searchJobs: (tags: string, location: string, title: string) => Promise<void>;
  userJobs: Job[];
  createJob: (jobData: CreateJobPayload) => Promise<void>;
  loading: boolean;
  getJobById: (id: string) => Promise<any>;
  likeJob: (id: string) => Promise<void>;
  applyToJob: (id: string) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

const JobsContext = createContext<JobsContextProps | undefined>(undefined);

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const JobsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userProfile } = useGlobalContext();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [userJobs, setUserJobs] = useState<Job[]>([]);

  const getJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log("Error to getting jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: CreateJobPayload) => {
    try {
      const res = await axios.post("/api/v1/jobs", jobData);
      toast.success("Job created successfully!");

      setJobs((prevJobs) => [res.data, ...prevJobs]);

      if (userProfile && userProfile._id) {
        setUserJobs((prevUserJobs) => [res.data, ...prevUserJobs]);
      }
    } catch (error) {
      console.log("Error creating job", error);
    }
  };

  const getUserJobs = async (userId: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/jobs/user/${userId}`);
      setUserJobs(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting user jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const searchJobs = async (tags: string, location: string, title: string) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (tags) query.append("tags", tags);
      if (location) query.append("location", location);
      if (title) query.append("tags", title);

      const res = await axios.get(`/api/v1/jobs/search?${query.toString()}`);
      setJobs(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error searching jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const getJobById = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/jobs/${id}`);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log("Error getting job by id", error);
    } finally {
      setLoading(false);
    }
  };

  const likeJob = async (id: string) => {
    try {
      const res = await axios.put(`/api/v1/jobs/like/${id}`);
      toast.success("Job liked successfully");
      getJobs();
    } catch (error) {
      console.log("Error liking job", error);
    }
  };

  const applyToJob = async (id: string) => {
    try {
      const res = await axios.put(`/api/v1/jobs/apply/${id}`);
      toast.success("Applied to job successfully");
      getJobs();
    } catch (error: any) {
      console.log("Error applying to job", error);
      toast.error(error.response.error.message);
    }
  };

  const deleteJob = async (id: string) => {
    try {
      await axios.delete(`/api/v1/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      setUserJobs((prevUserJobs) =>
        prevUserJobs.filter((userJob) => userJob._id !== id)
      );
      
      toast.success("Job deleted successfully");
    } catch (error) {
      console.log("Error deleting job...", error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  useEffect(() => {
    if (userProfile?._id) {
      getUserJobs(userProfile?._id);
    }
  }, [userProfile]);

  const value: JobsContextProps = {
    jobs,
    loading,
    createJob,
    userJobs,
    searchJobs,
    getJobById,
    likeJob,
    applyToJob,
    deleteJob,
  };

  return (
    <GlobalContextProvider>
      <JobsContext.Provider value={value}>{children}</JobsContext.Provider>
    </GlobalContextProvider>
  );
};

export const useJobsContext = () => {
  const context = useContext(JobsContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
