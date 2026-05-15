"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface ModalContextValue {
  isAddProjectOpen: boolean;
  openAddProject: () => void;
  closeAddProject: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const openAddProject = useCallback(() => setIsAddProjectOpen(true), []);
  const closeAddProject = useCallback(() => setIsAddProjectOpen(false), []);

  return (
    <ModalContext.Provider value={{ isAddProjectOpen, openAddProject, closeAddProject }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
