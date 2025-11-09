import { useState } from "react";
import StatCard from "@/components/StatCard";
import AppointmentCard from "@/components/AppointmentCard";
import PatientCard from "@/components/PatientCard";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import { Calendar, Users, Clock, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import patientImage1 from '@assets/generated_images/Elderly_patient_profile_photo_ae7f5e5f.png';
import patientImage2 from '@assets/generated_images/Young_patient_profile_photo_84642d5e.png';

export default function StaffDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockAppointments = [
    {
      patientName: "John Smith",
      patientImage: patientImage1,
      doctorName: "Sarah Johnson",
      date: "Nov 15, 2025",
      time: "2:00 PM",
      status: "confirmed" as const,
      purpose: "Regular Checkup",
    },
    {
      patientName: "Emily Chen",
      patientImage: patientImage2,
      doctorName: "Michael Brown",
      date: "Nov 16, 2025",
      time: "10:00 AM",
      status: "pending" as const,
      purpose: "Follow-up Consultation",
    },
  ];

  const mockPatients = [
    {
      name: "Robert Martinez",
      image: patientImage1,
      patientId: "P-2024-1234",
      age: 68,
      gender: "Male",
      email: "robert.m@email.com",
      phone: "+1 (555) 123-4567",
      bloodType: "O+",
      lastVisit: "Oct 28, 2025",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
        <p className="text-muted-foreground">Manage patient registration and appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Today's Appointments"
          value={24}
          icon={Calendar}
        />
        <StatCard
          title="Registered Patients"
          value={156}
          icon={Users}
        />
        <StatCard
          title="Pending Check-ins"
          value={5}
          icon={Clock}
        />
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList>
          <TabsTrigger value="schedule" data-testid="tab-schedule">Schedule Appointment</TabsTrigger>
          <TabsTrigger value="appointments" data-testid="tab-appointments">All Appointments</TabsTrigger>
          <TabsTrigger value="patients" data-testid="tab-patients">Patient Records</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="grid lg:grid-cols-2 gap-6">
          <div>
            <AppointmentCalendar onSelectSlot={(date, time) => console.log('Selected:', date, time)} />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Recent Appointments</h3>
            <div className="space-y-4">
              {mockAppointments.slice(0, 2).map((apt, idx) => (
                <AppointmentCard
                  key={idx}
                  {...apt}
                  onView={() => console.log('View appointment')}
                  onReschedule={() => console.log('Reschedule appointment')}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-appointments"
              />
            </div>
            <Button data-testid="button-new-appointment">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
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
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
                data-testid="input-search-patients"
              />
            </div>
            <Button data-testid="button-register-patient">
              <Plus className="w-4 h-4 mr-2" />
              Register Patient
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mockPatients.map((patient, idx) => (
              <PatientCard
                key={idx}
                {...patient}
                onViewProfile={() => console.log('View profile')}
                onViewRecords={() => console.log('View records')}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
