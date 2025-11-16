import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PageLayout, Section } from "../common/PageLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./appointments/columns";
import { useAppointments } from "@/hooks/useAppointments";

export default function AppointmentsPage() {
  const { appointments, isLoading } = useAppointments();
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <PageLayout
      title="Appointments"
      description="Manage and schedule patient appointments"
      actions={
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      }
    >
      <Section title="Upcoming Appointments">
        <DataTable
          columns={columns}
          data={appointments}
          isLoading={isLoading}
          searchKey="patientName"
        />
      </Section>
      
      {/* Add Appointment Dialog */}
      {/* <AddAppointmentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => setShowAddDialog(false)}
      /> */}
    </PageLayout>
  );
}
