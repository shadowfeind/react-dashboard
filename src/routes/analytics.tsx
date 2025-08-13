import { createFileRoute } from "@tanstack/react-router"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"

export const Route = createFileRoute("/analytics")({
  component: Analytics,
})

function Analytics() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>
        <p>This is the analytics page. Content coming soon!</p>
      </div>
    </DashboardLayout>
  )
}
