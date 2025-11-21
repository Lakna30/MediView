import PatientCard from "@/components/PatientCard";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Patients</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </div>
    </div>
  );
}
