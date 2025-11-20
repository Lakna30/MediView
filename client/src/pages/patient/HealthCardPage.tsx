import HealthCard from "@/components/HealthCard";
import patientImage from '@assets/generated_images/Young_patient_profile_photo_84642d5e.png';

export default function HealthCardPage() {
  return (
    <div className="space-y-6 flex justify-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Health Card</h1>
        <p className="text-muted-foreground">Your digital health card for quick reference</p>
      </div>
      <div className="mt-4">
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
    </div>
  );
}
