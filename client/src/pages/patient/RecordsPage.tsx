import MedicalRecordCard from "@/components/MedicalRecordCard";
import { FileText } from "lucide-react";

const mockRecords = [
  {
    title: "Annual Physical Examination",
    date: "Oct 15, 2025",
    doctor: "Sarah Johnson",
    diagnosis: "Patient in good health",
    prescription: ["Vitamin D3 - 1000 IU daily", "Multivitamin - 1 tablet daily"],
    notes: "Blood pressure normal. Recommended regular exercise.",
    recordType: "checkup" as const,
  },
  {
    title: "Blood Test Results",
    date: "Sep 20, 2025",
    doctor: "Michael Brown",
    diagnosis: "All values within normal range",
    recordType: "lab" as const,
  },
];

export default function RecordsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Medical Records</h1>
        <p className="text-muted-foreground">All your medical records and visit summaries</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockRecords.map((record, idx) => (
          <MedicalRecordCard key={idx} {...record} onView={() => console.log('View record')} />
        ))}
      </div>
    </div>
  );
}
