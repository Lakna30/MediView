import StatCard from '../StatCard';
import { Users } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="p-6 space-y-4 max-w-sm">
      <StatCard 
        title="Total Patients" 
        value={1234} 
        icon={Users}
        trend={{ value: "12%", isPositive: true }}
      />
    </div>
  );
}
