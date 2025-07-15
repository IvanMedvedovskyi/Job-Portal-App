import { GlobalContextProvider } from "@/context/globalContext";
import { JobsContextProvider } from "@/context/jobsContext";
import React, { FC } from "react";

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  return (
    <GlobalContextProvider>
      <JobsContextProvider>{children}</JobsContextProvider>
    </GlobalContextProvider>
  );
};

export default ContextProvider;
