import AppointmentCalendar from "@/components/AppointmentCalendar";
import AppointmentCard from "@/components/AppointmentCard";
import { Calendar } from "lucide-react";

const mockAppointments = [
  {
    patientName: "You",
    patientImage: undefined,
    doctorName: "Sarah Johnson",
    date: "Nov 20, 2025",
    time: "2:00 PM",
    status: "confirmed" as const,
    purpose: "Annual Physical Examination",
  },
  {
    patientName: "You",
    patientImage: undefined,
    doctorName: "Michael Brown",
    date: "Dec 5, 2025",
    time: "10:30 AM",
    status: "pending" as const,
    purpose: "Dental Checkup",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Appointments</h1>
        <p className="text-muted-foreground">View and manage your appointments</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}
