import HealthCard from '../HealthCard';
import patientImage from '@assets/generated_images/Young_patient_profile_photo_84642d5e.png';

export default function HealthCardExample() {
  return (
    <div className="p-6 flex justify-center">
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
    </div>
  );
}
