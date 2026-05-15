"use client";

import {
  createContext, useContext, useState, useCallback, useRef,
} from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  visible: boolean;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICON_MAP = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
} as const;

const BORDER_MAP: Record<ToastVariant, string> = {
  success: "border-emerald-500/25",
  error: "border-red-500/25",
  info: "border-blue-500/25",
};

const ICON_COLOR_MAP: Record<ToastVariant, string> = {
  success: "text-emerald-400",
  error: "text-red-400",
  info: "text-blue-400",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const toast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = String(++counter.current);
    setToasts((prev) => [...prev, { id, message, variant, visible: true }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast stack */}
      <div
        className="fixed bottom-24 right-6 z-[200] flex flex-col-reverse gap-2 pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((t) => {
          const Icon = ICON_MAP[t.variant];
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl",
                "border bg-[#0c1322] backdrop-blur-sm",
                "shadow-[0_8px_32px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(255,255,255,0.03)]",
                "animate-fade-up min-w-[280px] max-w-sm",
                BORDER_MAP[t.variant]
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", ICON_COLOR_MAP[t.variant])} />
              <p className="flex-1 text-xs font-medium text-[#f0f4f8] leading-snug">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 p-0.5 rounded-md text-[#415a72] hover:text-[#8ca4be] transition-colors"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
