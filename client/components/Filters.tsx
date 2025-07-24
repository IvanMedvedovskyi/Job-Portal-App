"use client";
import React from "react";
import { Button } from "./ui/button";
import { useJobsContext } from "@/context/jobsContext";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { formatMoney } from "@/utils/formatMoney";

const Filters = () => {
  const {
    handleFilterChange,
    filters,
    setFilters,
    minSalary,
    maxSalary,
    setMinSalary,
    setMaxSalary,
    searchJobs,
    setSearchQuery,
  } = useJobsContext();

  const clearFilters = () => {
    setFilters({
      fullTime: false,
      partTime: false,
      internship: false,
      contract: false,
      fullStack: false,
      backend: false,
      devOps: false,
      uiux: false,
    });

    setMinSalary(0);
    setMaxSalary(120000);
    setSearchQuery({ tags: "", location: "", title: "" });
  };

  const handleMinSalaryChange = (value: number[]) => {
    setMinSalary(value[0]);

    if (value[0] > maxSalary) {
      setMaxSalary(value[0]);
    }
  };

  const handleMaxSalaryChange = (value: number[]) => {
    setMaxSalary(value[0]);

    if (value[0] < minSalary) {
      setMinSalary(value[0]);
    }
  };

  return (
    <div className="w-[22rem] pr-4 space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">Job Type</h2>

          <Button
            onClick={() => {
              clearFilters();
              searchJobs();
            }}
            variant={"ghost"}
            className="h-auto cursor-pointer text-red-500 hover:text-red-700"
          >
            Clear All
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullTime"
              className="border border-gray-400"
              checked={filters.fullTime}
              onCheckedChange={() => handleFilterChange("fullTime")}
            />
            <Label htmlFor="fullTime">Full Time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="partTime"
              className="border border-gray-400"
              checked={filters.partTime}
              onCheckedChange={() => handleFilterChange("partTime")}
            />
            <Label htmlFor="partTime">Part Time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="contract"
              className="border border-gray-400"
              checked={filters.contract}
              onCheckedChange={() => handleFilterChange("contract")}
            />
            <Label htmlFor="contract">Contract</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="internship"
              className="border border-gray-400"
              checked={filters.internship}
              onCheckedChange={() => handleFilterChange("internship")}
            />
            <Label htmlFor="internship">Internship</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Tags</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fullStack"
              className="border border-gray-400"
              checked={filters.fullStack}
              onCheckedChange={() => handleFilterChange("fullStack")}
            />
            <Label htmlFor="fullStack">Full Stack</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="backend"
              className="border border-gray-400"
              checked={filters.backend}
              onCheckedChange={() => handleFilterChange("backend")}
            />
            <Label htmlFor="backend">Back End</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="devOps"
              className="border border-gray-400"
              checked={filters.devOps}
              onCheckedChange={() => handleFilterChange("devOps")}
            />
            <Label htmlFor="devOps">DevOps</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uiux"
              className="border border-gray-400"
              checked={filters.uiux}
              onCheckedChange={() => handleFilterChange("uiux")}
            />
            <Label htmlFor="uiux">UI/UX</Label>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Salary Range</h2>
        <div className="flex flex-col gap-4">
          <Label htmlFor="minSalary">Minimum Salary</Label>
          <Slider
            id="minSalary"
            min={0}
            max={200000}
            step={50}
            value={[minSalary]}
            onValueChange={handleMinSalaryChange}
            className="w-full"
          />
          <span className="text-sm text-gray-500">
            {formatMoney(minSalary, "USD")}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <Label htmlFor="maxSalary">Maximum Salary</Label>
          <Slider
            id="maxSalary"
            min={0}
            max={200000}
            step={50}
            value={[maxSalary]}
            onValueChange={handleMaxSalaryChange}
            className="w-full"
          />
          <span className="text-sm text-gray-500">
            {formatMoney(maxSalary, "USD")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
