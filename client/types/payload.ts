export interface CreateJobPayload {
  title: string;
  description: string;
  location: string;
  salary: number;
  salaryType?: string;
  negotiable?: boolean;
  jobType: string[];
  tags?: string[];
  skills: string[];
}
