import AppointmentCalendar from "@/components/AppointmentCalendar";

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Schedule</h1>
      <AppointmentCalendar />
    </div>
  );
}
