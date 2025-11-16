import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageLayout, Section } from "../common/PageLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./staff/columns";

type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: "doctor" | "nurse" | "receptionist" | "admin";
  department: string;
  status: "active" | "inactive";
  joinDate: string;
};

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Mock data - replace with actual data from your API
  const staff: StaffMember[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "doctor",
      department: "Cardiology",
      status: "active",
      joinDate: "2022-01-15",
    },
    // Add more mock data as needed
  ];

  const filteredStaff = staff.filter(staffMember => 
    staffMember.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staffMember.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staffMember.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Staff Management"
      description="Manage hospital staff and their roles"
      actions={
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      }
    >
      <Section title="Staff Members">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search staff..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={filteredStaff}
          isLoading={false}
          searchKey="name"
        />
      </Section>
      
      {/* Add Staff Dialog */}
      {/* <AddStaffDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => setShowAddDialog(false)}
      /> */}
    </PageLayout>
  );
}
