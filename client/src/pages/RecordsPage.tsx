import MedicalRecordCard from "@/components/MedicalRecordCard";

export default function RecordsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Medical Records</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MedicalRecordCard />
        <MedicalRecordCard />
      </div>
    </div>
  );
}
