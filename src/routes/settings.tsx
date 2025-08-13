import { createFileRoute } from "@tanstack/react-router"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"

export const Route = createFileRoute("/settings")({
  component: Settings,
})

function Settings() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <p>This is the settings page. Content coming soon!</p>
      </div>
    </DashboardLayout>
  )
}
