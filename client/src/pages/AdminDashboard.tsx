import { useState, useMemo } from "react";
import StatCard from "@/components/StatCard";
import AppointmentCard from "@/components/AppointmentCard";
import PatientCard from "@/components/PatientCard";
import AddPatientDialog from "@/components/AddPatientDialog";
import AddAppointmentDialog from "@/components/AddAppointmentDialog";
import { Users, Calendar, FileText, Activity, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePatients } from "@/hooks/usePatients";
import { useAppointments } from "@/hooks/useAppointments";

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { patients, isLoading: loadingPatients } = usePatients();
  const { appointments, isLoading: loadingAppointments, updateAppointment } = useAppointments();

  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patients;
    return patients.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [patients, searchQuery]);

  const filteredAppointments = useMemo(() => {
    if (!searchQuery) return appointments;
    return appointments.filter(apt =>
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [appointments, searchQuery]);

  const stats = {
    totalPatients: patients.length,
    todayAppointments: appointments.filter(a => a.status !== "cancelled").length,
    activeDoctors: 12,
    medicalRecords: patients.length * 3,
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loadingPatients || loadingAppointments) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Activity className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage hospital operations and oversight</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
        />
        <StatCard
          title="Total Appointments"
          value={stats.todayAppointments}
          icon={Calendar}
        />
        <StatCard
          title="Active Doctors"
          value={stats.activeDoctors}
          icon={Activity}
        />
        <StatCard
          title="Medical Records"
          value={stats.medicalRecords}
          icon={FileText}
        />
      </div>

      <Tabs defaultValue="appointments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="appointments" data-testid="tab-appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients" data-testid="tab-patients">Patients</TabsTrigger>
          <TabsTrigger value="staff" data-testid="tab-staff">Staff Management</TabsTrigger>
        </TabsList>

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
            <AddAppointmentDialog />
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No appointments found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredAppointments.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  patientName={apt.patientName}
                  doctorName={apt.doctorName}
                  date={apt.date}
                  time={apt.time}
                  status={apt.status}
                  purpose={apt.purpose}
                  onView={() => console.log('View', apt.id)}
                  onReschedule={() => console.log('Reschedule', apt.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search-patients"
              />
            </div>
            <AddPatientDialog />
          </div>

          {filteredPatients.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No patients found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPatients.map((patient) => (
                <PatientCard
                  key={patient.id}
                  name={patient.name}
                  patientId={patient.id}
                  age={calculateAge(patient.dateOfBirth)}
                  gender={patient.gender}
                  email={patient.email}
                  phone={patient.phone}
                  bloodType={patient.bloodType}
                  onViewProfile={() => console.log('View', patient.id)}
                  onViewRecords={() => console.log('Records', patient.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-10"
                data-testid="input-search-staff"
              />
            </div>
            <Button data-testid="button-add-staff">
              <Plus className="w-4 h-4 mr-2" />
              Add Staff
            </Button>
          </div>
          <div className="bg-muted/50 border border-dashed rounded-lg p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Staff Management</h3>
            <p className="text-muted-foreground">
              Manage doctors, nurses, and administrative staff
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
