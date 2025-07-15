export interface AuthUser {
  sid: string;
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string; // ISO string
  email: string;
  email_verified: boolean;
  sub: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  auth0Id: string;
  appliedJobs: string[]; // массив ID вакансий
  savedJobs: string[]; // массив ID вакансий
  role: "jobseeker" | "recruiter" | "admin"; // если могут быть другие роли — добавь сюда
  profilePicture: string;
  bio: string;
  profession: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface AuthResponse {
  isAuthenticated: boolean;
  user: AuthUser;
}

export interface JobCreator {
  _id: string;
  name: string;
  profilePicture: string;
}

export interface Job {
  _id: string;
  title: string;
  location: string;
  salary: number;
  salaryType: "hourly" | "monthly" | "yearly";
  negotiable: boolean;
  jobType: string[];
  description: string;
  tags: string[];
  skills: string[];
  likes: string[]; // user _id[]
  applicants: string[]; // user _id[]
  createdBy: JobCreator;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
