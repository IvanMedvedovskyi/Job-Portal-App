"use client";

import dynamic from "next/dynamic";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import { Label } from "../ui/label";
import "react-quill-new/dist/quill.snow.css";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const MyEditor = () => {
  const { jobDescription, setJobDescription } = useGlobalContext();

  return (
    <ReactQuill
      style={{
        minHeight: "400px",
        maxHeight: "900px",
      }}
      modules={{
        toolbar: true,
      }}
      className="custom-quill-editor"
      value={jobDescription}
      onChange={setJobDescription}
    />
  );
};

const JobDetails = () => {
  const {
    salary,
    handleSalaryChange,
    salaryType,
    setSalaryType,
    setNegotiable,
    negotiable,
  } = useGlobalContext();
  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        <div className="flex-1">
          <Label htmlFor="jobDescription" className="text-gray-500 mt-2">
            Provide a detailed description of the job
          </Label>
        </div>
        <div className="flex-1">
          <MyEditor />
        </div>
      </div>
      <Separator className="my-2" />
      <div className="relative grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-black font-bold">Salary</h3>
          <Label htmlFor="salary" className="text-gray-500 mt-2">
            Enter the salary range for the job
          </Label>
        </div>

        <div>
          <Input
            type="number"
            id="salary"
            placeholder="Enter Salary"
            value={salary}
            onChange={handleSalaryChange}
            className="mt-2"
          />

          <div className="flex gap-2 mt-2 justify-between">
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
              <Checkbox id="negotiable" />
              <Label htmlFor="negotiable" className="text-gray-500">
                Negotiable
              </Label>
            </div>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
              <Checkbox
                checked={negotiable}
                onCheckedChange={(checked) => setNegotiable(checked === true)}
                id="hideSalary"
              />
              <Label htmlFor="hideSalary" className="text-gray-500">
                Hide Salary
              </Label>
            </div>

            <div>
              <Select onValueChange={setSalaryType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="w-[120px] mt-2">
                  <SelectItem value="Yealy">Yearly</SelectItem>
                  <SelectItem value="Month">Month</SelectItem>
                  <SelectItem value="Hour">Hour</SelectItem>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
