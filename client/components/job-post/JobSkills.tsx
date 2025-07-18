"use client";

import { useGlobalContext } from "@/context/globalContext";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const JobSkills = () => {
  const { skills, setSkills, tags, setTags } = useGlobalContext();

  const [newSkill, setNewSkill] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleAddNewSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s: string) => s !== skillToRemove));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Skills</h3>
          <Label
            htmlFor="skills"
            className="text-sm text-muted-foreground mt-2"
          >
            Add relevant skills for the job position.
          </Label>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              id="skills"
              placeholder="Enter a skill..."
              value={newSkill}
              onChange={(event) => setNewSkill(event.target.value.trim())}
            />

            <Button type="button" onClick={handleAddNewSkill}>
              Add Skill{" "}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center space-x-1"
              >
                <span>{skill}</span>
                <button
                  className="text-primary-foreground cursor-pointer hover:text-red-500 focus:outline-none"
                  onClick={() => handleRemoveSkill(skill)}
                  type="button"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Tags</h3>
          <Label htmlFor="tags" className="text-sm text-muted-foreground mt-2">
            Add relevant tags for the job position
          </Label>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              id="tags"
              placeholder="Enter a skill..."
              value={newTag}
              onChange={(event) => setNewTag(event.target.value.trim())}
            />

            <Button type="button" onClick={handleAddTag}>
              Add Tags
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center space-x-1"
              >
                <span>{tag}</span>
                <button
                  className="text-primary-foreground cursor-pointer hover:text-red-500 focus:outline-none"
                  onClick={() => handleRemoveTag(tag)}
                  type="button"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSkills;
