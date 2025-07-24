"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { GlobalContextProvider, useGlobalContext } from "./globalContext";
import axios from "axios";
import { CreateJobPayload } from "@/types/payload";
import toast from "react-hot-toast";
import { Job } from "@/types/types";

interface JobsContextProps {
  jobs: Job[];
  searchJobs: (
    tags?: string,
    location?: string,
    title?: string
  ) => Promise<void>;
  userJobs: Job[];
  createJob: (jobData: CreateJobPayload) => Promise<void>;
  loading: boolean;
  getJobById: (id: string) => Promise<any>;
  likeJob: (id: string) => Promise<void>;
  applyToJob: (id: string) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  handleSearchChange: (searchName: string, value: Object) => void;
  searchQuery: {
    tags: string;
    location: string;
    title: string;
  };
  setSearchQuery: React.Dispatch<
    React.SetStateAction<{
      tags: string;
      location: string;
      title: string;
    }>
  >;
  filters: {
    fullTime: boolean;
    partTime: boolean;
    internship: boolean;
    contract: boolean;
    fullStack: boolean;
    backend: boolean;
    devOps: boolean;
    uiux: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      fullTime: boolean;
      partTime: boolean;
      internship: boolean;
      contract: boolean;
      fullStack: boolean;
      backend: boolean;
      devOps: boolean;
      uiux: boolean;
    }>
  >;
  minSalary: number;
  setMinSalary: React.Dispatch<React.SetStateAction<number>>;
  maxSalary: number;
  setMaxSalary: React.Dispatch<React.SetStateAction<number>>;
  handleFilterChange: (filterName: FilterKey) => void;
}

type FilterKey =
  | "fullTime"
  | "partTime"
  | "internship"
  | "contract"
  | "fullStack"
  | "backend"
  | "devOps"
  | "uiux";

const JobsContext = createContext<JobsContextProps | undefined>(undefined);

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
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
  const [searchQuery, setSearchQuery] = useState({
    tags: "",
    location: "",
    title: "",
  });

  // Filters
  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    contract: false,
    fullStack: false,
    backend: false,
    devOps: false,
    uiux: false,
  });

  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(120000);

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

  const searchJobs = async (
    tags?: string,
    location?: string,
    title?: string
  ) => {
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
      if (res.data.likes.includes(userProfile?._id)) {
        toast.success("Job liked successfully");
      } else {
        toast.success("Job unliked successfully");
      }

      getJobs();
    } catch (error) {
      console.log("Error liking job", error);
    }
  };

  const applyToJob = async (id: string) => {
    const job = jobs.find((j) => j._id === id);

    if (job && userProfile && job.applicants.includes(userProfile?._id)) {
      toast.error("You jave already applied to this job");
      return;
    }
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

  const handleSearchChange = (searchName: string, value: Object) => {
    setSearchQuery((prev) => ({
      ...prev,
      [searchName]: value,
    }));
  };

  const handleFilterChange = (filterName: FilterKey) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
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
    handleSearchChange,
    searchQuery,
    setSearchQuery,
    filters,
    maxSalary,
    minSalary,
    setFilters,
    setMaxSalary,
    setMinSalary,
    handleFilterChange,
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
