import { createFileRoute } from "@tanstack/react-router"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"

export const Route = createFileRoute("/$404")({
  component: NotFound,
})

function NotFound() {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </div>
    </DashboardLayout>
  )
}
