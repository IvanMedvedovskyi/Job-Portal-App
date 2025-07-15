export interface CreateJobPayload {
  title: string;
  description: string;
  location: string;
  salary: number;
  salaryType?: "hourly" | "monthly" | "yearly";
  negotiable?: boolean;
  jobType: string[];
  tags?: string[];
  skills: string[]; 
}
