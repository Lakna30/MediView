import AppointmentCard from '../AppointmentCard';
import doctorImage from '@assets/generated_images/Female_doctor_professional_headshot_cbc51cc9.png';

export default function AppointmentCardExample() {
  return (
    <div className="p-6 max-w-2xl">
      <AppointmentCard 
        patientName="John Smith"
        patientImage={doctorImage}
        doctorName="Sarah Johnson"
        date="Nov 15, 2025"
        time="2:00 PM"
        status="confirmed"
        purpose="Regular Checkup"
        onView={() => console.log('View appointment')}
        onReschedule={() => console.log('Reschedule appointment')}
      />
    </div>
  );
}
