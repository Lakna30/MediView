import { useState } from "react";
import StatCard from "@/components/StatCard";
import AppointmentCard from "@/components/AppointmentCard";
import HealthCard from "@/components/HealthCard";
import MedicalRecordCard from "@/components/MedicalRecordCard";
import AppointmentCalendar from "@/components/AppointmentCalendar";
import { Calendar, FileText, Activity, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import doctorImage from '@assets/generated_images/Female_doctor_professional_headshot_cbc51cc9.png';
import patientImage from '@assets/generated_images/Young_patient_profile_photo_84642d5e.png';

export default function PatientDashboard() {
  const mockAppointments = [
    {
      patientName: "You",
      patientImage: patientImage,
      doctorName: "Sarah Johnson",
      date: "Nov 20, 2025",
      time: "2:00 PM",
      status: "confirmed" as const,
      purpose: "Annual Physical Examination",
    },
    {
      patientName: "You",
      patientImage: patientImage,
      doctorName: "Michael Brown",
      date: "Dec 5, 2025",
      time: "10:30 AM",
      status: "pending" as const,
      purpose: "Dental Checkup",
    },
  ];

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Health Dashboard</h1>
        <p className="text-muted-foreground">Track your health and manage appointments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value={2}
          icon={Calendar}
        />
        <StatCard
          title="Medical Records"
          value={12}
          icon={FileText}
        />
        <StatCard
          title="Active Prescriptions"
          value={3}
          icon={Activity}
        />
        <StatCard
          title="Health Score"
          value="98%"
          icon={Heart}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments" data-testid="tab-appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records" data-testid="tab-records">Medical Records</TabsTrigger>
          <TabsTrigger value="health-card" data-testid="tab-health-card">Health Card</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Upcoming Appointments</h3>
              {mockAppointments.slice(0, 1).map((apt, idx) => (
                <AppointmentCard
                  key={idx}
                  {...apt}
                  onView={() => console.log('View appointment')}
                  onReschedule={() => console.log('Reschedule appointment')}
                />
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recent Medical Records</h3>
              {mockRecords.slice(0, 1).map((record, idx) => (
                <MedicalRecordCard
                  key={idx}
                  {...record}
                  onView={() => console.log('View record')}
                />
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Health Vitals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="text-2xl font-bold">120/80</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="text-2xl font-bold">72 bpm</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Body Temperature</p>
                  <p className="text-2xl font-bold">98.6°F</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="grid lg:grid-cols-2 gap-6">
          <div>
            <AppointmentCalendar onSelectSlot={(date, time) => console.log('Book:', date, time)} />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Appointments</h3>
            <div className="space-y-4">
              {mockAppointments.map((apt, idx) => (
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

        <TabsContent value="records" className="space-y-4">
          <h3 className="font-semibold text-lg">Your Medical Records</h3>
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

        <TabsContent value="health-card" className="flex justify-center">
          <HealthCard
            patientName="Emily Chen"
            patientImage={patientImage}
            patientId="P-2024-5678"
            dateOfBirth="Jan 15, 1995"
            bloodType="A+"
            validUntil="Dec 31, 2025"
            onDownload={() => console.log('Download card')}
            onPrint={() => console.log('Print card')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
