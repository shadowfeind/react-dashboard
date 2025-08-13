import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  component: Index,
});

interface UserData {
  id: string;
  name: string;
  email: string;
  status: string;
}

function Index() {
  const { data, isLoading, isError } = useQuery<UserData[]>({
    queryKey: ["users"],
    queryFn: async () => {
      // Simulate a network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch data");
      }
      return [
        {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          status: "Active",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          status: "Inactive",
        },
        {
          id: "3",
          name: "Peter Jones",
          email: "peter@example.com",
          status: "Active",
        },
      ];
    },
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
            <Skeleton className="h-[40px] w-full" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">
            Error loading data. Please try again.
          </div>
        ) : !data || data.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No data available.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DashboardLayout>
  );
}
