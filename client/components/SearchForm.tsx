"use client";
import { useJobsContext } from "@/context/jobsContext";
import { location } from "@/utils/Icons";
import { Search } from "lucide-react";
import React from "react";

const SearchForm = () => {
  const { searchJobs, handleSearchChange, searchQuery } = useJobsContext();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        searchJobs(searchQuery.tags, searchQuery.location, searchQuery.title);
      }}
      className="relative flex items-center"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          id="job-title"
          name="title"
          value={searchQuery.title}
          onChange={(event) => handleSearchChange("title", event.target.value)}
          placeholder="Job Title or Keywords"
          className="w-full py-7 outline-none bg-white text-2xl text-black pl-[5rem] rounded-tl-full rounded-bl-full"
        />
        <span>
          <Search
            size={30}
            className="text-gray-400 text-2xl absolute left-8 top-1/2 translate-y-[-50%]"
          />
        </span>
      </div>

      <div className="absolute top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 w-[2px] h-11 bg-gray-300" />

      <div className="flex-1 relative">
        <input
          type="text"
          id="location"
          name="location"
          value={searchQuery.location}
          onChange={(event) =>
            handleSearchChange("location", event.target.value)
          }
          placeholder="Enter Location"
          className="w-full py-7 outline-none bg-white text-2xl text-black pl-[5rem] rounded-tr-full rounded-br-full"
        />
        <span className="text-gray-400 text-3xl absolute left-6 top-[50%] translate-y-[-50%]">
          {location}
        </span>
      </div>

      <button
        type="submit"
        className="bg-indigo-500 cursor-pointer hover:bg-indigo-600/70 text-white text-2xl px-14 py-2 rounded-full absolute right-2 top-[50%] transform translate-y-[-50%] h-[calc(100%-1rem)]"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
