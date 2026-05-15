import { Sidebar } from "@/components/layout/sidebar";
import { MobileNavProvider } from "@/components/layout/mobile-nav-context";
import { DashboardClientLayer } from "@/components/providers/dashboard-client-layer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MobileNavProvider>
      <DashboardClientLayer>
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
            {children}
          </div>
        </div>
      </DashboardClientLayer>
    </MobileNavProvider>
  );
}
