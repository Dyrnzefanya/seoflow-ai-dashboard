import { Topbar } from "@/components/layout/topbar";
import { DashboardShell, GridCols2 } from "@/components/layout/dashboard-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Manage your account and integrations" />
      <DashboardShell>
        <GridCols2>
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Name", value: "Alex Johnson" },
                { label: "Email", value: "alex@acme.com" },
                { label: "Plan", value: "Pro" },
              ].map((f) => (
                <div key={f.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#475569]">{f.label}</span>
                  <span className="text-xs font-medium text-[#94a3b8]">{f.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Google Search Console", status: "connected" },
                { name: "Google Analytics 4", status: "connected" },
                { name: "WordPress", status: "disconnected" },
                { name: "n8n Automation", status: "disconnected" },
              ].map((i) => (
                <div key={i.name} className="flex items-center justify-between">
                  <span className="text-xs text-[#94a3b8]">{i.name}</span>
                  <Badge variant={i.status === "connected" ? "success" : "default"}>{i.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </GridCols2>
      </DashboardShell>
    </>
  );
}
