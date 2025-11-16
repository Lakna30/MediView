import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageLayout, Section } from "../common/PageLayout";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./patients/columns";
import { usePatients } from "@/hooks/usePatients";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { patients, isLoading } = usePatients();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredPatients = patients?.filter(patient => 
    patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Patients"
      description="Manage patient records and information"
      actions={
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      }
    >
      <Section title="Patient List">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={filteredPatients || []}
          isLoading={isLoading}
          searchKey="name"
        />
      </Section>
      
      {/* Add Patient Dialog */}
      {/* <AddPatientDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSuccess={() => setShowAddDialog(false)}
      /> */}
    </PageLayout>
  );
}
