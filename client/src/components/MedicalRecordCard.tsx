import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, User } from "lucide-react";

interface MedicalRecordCardProps {
  title: string;
  date: string;
  doctor: string;
  diagnosis?: string;
  prescription?: string[];
  notes?: string;
  recordType: "checkup" | "emergency" | "surgery" | "lab" | "other";
  onView?: () => void;
}

export default function MedicalRecordCard({
  title,
  date,
  doctor,
  diagnosis,
  prescription,
  notes,
  recordType,
  onView,
}: MedicalRecordCardProps) {
  const recordTypeColors = {
    checkup: "bg-blue-500 text-white",
    emergency: "bg-red-500 text-white",
    surgery: "bg-purple-500 text-white",
    lab: "bg-green-500 text-white",
    other: "bg-gray-500 text-white",
  };

  return (
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="flex-1 min-w-0">
          <CardTitle className="text-base font-semibold mb-2">{title}</CardTitle>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              Dr. {doctor}
            </span>
          </div>
        </div>
        <Badge className={recordTypeColors[recordType]}>
          {recordType.charAt(0).toUpperCase() + recordType.slice(1)}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {diagnosis && (
          <div>
            <p className="text-sm font-medium mb-1">Diagnosis</p>
            <p className="text-sm text-muted-foreground">{diagnosis}</p>
          </div>
        )}
        {prescription && prescription.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-1">Prescription</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {prescription.map((med, idx) => (
                <li key={idx}>• {med}</li>
              ))}
            </ul>
          </div>
        )}
        {notes && (
          <div>
            <p className="text-sm font-medium mb-1">Notes</p>
            <p className="text-sm text-muted-foreground">{notes}</p>
          </div>
        )}
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full mt-2" 
          onClick={onView}
          data-testid="button-view-record"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Full Record
        </Button>
      </CardContent>
    </Card>
  );
}
