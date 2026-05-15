"use client";

import { ModalProvider } from "./modal-context";
import { ToastProvider } from "@/components/ui/toast";
import { OnboardingModal } from "@/components/onboarding/onboarding-modal";
import { AddProjectModal } from "@/components/onboarding/add-project-modal";
import { AiAssistant } from "@/components/ui/ai-assistant";

export function DashboardClientLayer({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <ToastProvider>
        {children}
        <OnboardingModal />
        <AddProjectModal />
        <AiAssistant />
      </ToastProvider>
    </ModalProvider>
  );
}
