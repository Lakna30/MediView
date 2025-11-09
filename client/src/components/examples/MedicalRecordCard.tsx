import MedicalRecordCard from '../MedicalRecordCard';

export default function MedicalRecordCardExample() {
  return (
    <div className="p-6 max-w-md">
      <MedicalRecordCard 
        title="Annual Physical Examination"
        date="Oct 15, 2025"
        doctor="Sarah Johnson"
        diagnosis="Patient in good health"
        prescription={["Vitamin D3 - 1000 IU daily", "Multivitamin - 1 tablet daily"]}
        notes="Blood pressure normal. Recommended regular exercise."
        recordType="checkup"
        onView={() => console.log('View record')}
      />
    </div>
  );
}
