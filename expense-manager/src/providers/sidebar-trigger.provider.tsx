import type React from "react";
import { createContext, useContext, useState } from "react";

type SideBarTriggerProviderState = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSideBarSheetOpen: boolean;
  setIsSideBarSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: SideBarTriggerProviderState = {
  isSideBarOpen: true,
  setIsSideBarOpen: () => {},
  isSideBarSheetOpen: false,
  setIsSideBarSheetOpen: () => {},
};

const SideBarTriggerProviderContext =
  createContext<SideBarTriggerProviderState>(initialState);

export const SideBarTriggerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isSideBarSheetOpen, setIsSideBarSheetOpen] = useState(false);

  const value = {
    isSideBarOpen,
    setIsSideBarOpen,
    isSideBarSheetOpen,
    setIsSideBarSheetOpen,
  };

  return (
    <SideBarTriggerProviderContext.Provider value={value}>
      {children}
    </SideBarTriggerProviderContext.Provider>
  );
};

export const useSideBarTrigger = () => {
  const context = useContext(SideBarTriggerProviderContext);
  if (!context) {
    throw new Error(
      "useSideBarTrigger must be used within an SideBarTriggerProvider"
    );
  }
  return context;
};

export default SideBarTriggerProviderContext;
