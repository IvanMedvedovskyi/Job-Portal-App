"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthUser, User } from "@/types/types";

interface GlobalState {
  isAuth: boolean;
  auth0User: AuthUser | null;
  userProfile: User | null;
  getUserProfile: (id: string) => Promise<void>;
  loading: boolean;

  jobTitle: string;
  jobDescription: string;
  salary: number;
  activeEmploymentTypes: never[];
  salaryType: string;
  negotiable: boolean;
  tags: never[];
  skills: never[];
  location: {
    country: string;
    city: string;
    address: string;
  };
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GlobalContext = createContext<GlobalState | undefined>(undefined);

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [auth0User, setAuth0User] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [salary, setSalary] = useState(0);
  const [activeEmploymentTypes, setActiveEmploymentTypes] = useState([]);
  const [salaryType, setSalaryType] = useState("Yearly");
  const [negotiable, setNegotiable] = useState(false);
  const [tags, setTags] = useState([]);
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState({
    country: "",
    city: "",
    address: "",
  });

  const checkAuth = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/check-auth");
      setIsAuth(res.data.isAuthenticated);
      setAuth0User(res.data.user);
      setLoading(false);
    } catch (error) {
      console.log("Error checking auth", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const getUserProfile = async (id: string) => {
    try {
      const res = await axios.get(`/api/v1/user/${id}`);
      setUserProfile(res.data);
    } catch (error) {
      console.log("Error getting user profile", error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobTitle(event.target.value.trimStart());
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJobDescription(event.target.value.trimStart());
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSalary(+event.target.value);
  };

  const value: GlobalState = {
    isAuth,
    auth0User,
    userProfile,
    getUserProfile,
    loading,
    jobTitle,
    jobDescription,
    salary,
    activeEmploymentTypes,
    salaryType,
    negotiable,
    tags,
    skills,
    location,
    handleTitleChange,
    handleDescriptionChange,
    handleSalaryChange,
  };

  useEffect(() => {
    if (isAuth && auth0User) {
      getUserProfile(auth0User.sub);
    }
  }, [isAuth, auth0User]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
