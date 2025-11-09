import AppointmentCalendar from '../AppointmentCalendar';

export default function AppointmentCalendarExample() {
  return (
    <div className="p-6 max-w-2xl">
      <AppointmentCalendar onSelectSlot={(date, time) => console.log('Selected:', date, time)} />
    </div>
  );
}
