import PatientCard from '../PatientCard';
import patientImage from '@assets/generated_images/Elderly_patient_profile_photo_ae7f5e5f.png';

export default function PatientCardExample() {
  return (
    <div className="p-6 max-w-md">
      <PatientCard 
        name="Robert Martinez"
        image={patientImage}
        patientId="P-2024-1234"
        age={68}
        gender="Male"
        email="robert.m@email.com"
        phone="+1 (555) 123-4567"
        bloodType="O+"
        lastVisit="Oct 28, 2025"
        onViewProfile={() => console.log('View profile')}
        onViewRecords={() => console.log('View records')}
      />
    </div>
  );
}
