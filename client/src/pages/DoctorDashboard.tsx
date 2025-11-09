import { useState } from "react";
import StatCard from "@/components/StatCard";
import AppointmentCard from "@/components/AppointmentCard";
import MedicalRecordCard from "@/components/MedicalRecordCard";
import { Calendar, Users, FileText, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import patientImage1 from '@assets/generated_images/Elderly_patient_profile_photo_ae7f5e5f.png';
import patientImage2 from '@assets/generated_images/Young_patient_profile_photo_84642d5e.png';

export default function DoctorDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockAppointments = [
    {
      patientName: "John Smith",
      patientImage: patientImage1,
      doctorName: "You",
      date: "Nov 15, 2025",
      time: "2:00 PM",
      status: "confirmed" as const,
      purpose: "Regular Checkup",
    },
    {
      patientName: "Emily Chen",
      patientImage: patientImage2,
      doctorName: "You",
      date: "Nov 15, 2025",
      time: "3:30 PM",
      status: "confirmed" as const,
      purpose: "Follow-up Consultation",
    },
    {
      patientName: "Robert Martinez",
      patientImage: patientImage1,
      doctorName: "You",
      date: "Nov 16, 2025",
      time: "10:00 AM",
      status: "pending" as const,
      purpose: "Lab Results Review",
    },
  ];

  const mockRecords = [
    {
      title: "Annual Physical Examination",
      date: "Oct 15, 2025",
      doctor: "You",
      diagnosis: "Patient in good health",
      prescription: ["Vitamin D3 - 1000 IU daily", "Multivitamin - 1 tablet daily"],
      notes: "Blood pressure normal. Recommended regular exercise.",
      recordType: "checkup" as const,
    },
    {
      title: "Emergency Room Visit",
      date: "Sep 28, 2025",
      doctor: "You",
      diagnosis: "Minor laceration on left hand",
      prescription: ["Antibiotic ointment - Apply twice daily", "Ibuprofen 400mg - As needed for pain"],
      notes: "Wound cleaned and dressed. Follow-up in 5 days.",
      recordType: "emergency" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Manage your appointments and patient care</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value={8}
          icon={Calendar}
        />
        <StatCard
          title="Total Patients"
          value={156}
          icon={Users}
        />
        <StatCard
          title="Pending Reviews"
          value={12}
          icon={FileText}
        />
        <StatCard
          title="Avg. Wait Time"
          value="15 min"
          icon={Clock}
        />
      </div>

      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="appointments" data-testid="tab-appointments">Today's Schedule</TabsTrigger>
          <TabsTrigger value="patients" data-testid="tab-patients">My Patients</TabsTrigger>
          <TabsTrigger value="records" data-testid="tab-records">Recent Records</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-appointments"
            />
          </div>

          <div className="grid gap-4">
            {mockAppointments.map((apt, idx) => (
              <AppointmentCard
                key={idx}
                {...apt}
                onView={() => console.log('View appointment')}
                onReschedule={() => console.log('Reschedule appointment')}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-10"
              data-testid="input-search-patients"
            />
          </div>
          <div className="bg-muted/50 border border-dashed rounded-lg p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Patient List</h3>
            <p className="text-muted-foreground">
              View and manage your assigned patients
            </p>
          </div>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search medical records..."
              className="pl-10"
              data-testid="input-search-records"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockRecords.map((record, idx) => (
              <MedicalRecordCard
                key={idx}
                {...record}
                onView={() => console.log('View record')}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
