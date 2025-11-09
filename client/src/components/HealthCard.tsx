import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer } from "lucide-react";

interface HealthCardProps {
  patientName: string;
  patientImage?: string;
  patientId: string;
  dateOfBirth: string;
  bloodType: string;
  validUntil: string;
  hospitalName?: string;
  onDownload?: () => void;
  onPrint?: () => void;
}

export default function HealthCard({
  patientName,
  patientImage,
  patientId,
  dateOfBirth,
  bloodType,
  validUntil,
  hospitalName = "MediView Hospital",
  onDownload,
  onPrint,
}: HealthCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const qrData = JSON.stringify({
    id: patientId,
    name: patientName,
    dob: dateOfBirth,
    bloodType: bloodType,
  });

  return (
    <Card className="max-w-md bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-1">{hospitalName}</h2>
          <p className="text-sm text-muted-foreground">Digital Health Card</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-primary/20">
            <AvatarImage src={patientImage} alt={patientName} />
            <AvatarFallback className="text-2xl">{getInitials(patientName)}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">{patientName}</h3>
            <p className="text-sm text-muted-foreground mb-2">Patient ID: {patientId}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 w-full text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Date of Birth</p>
              <p className="font-medium">{dateOfBirth}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Blood Type</p>
              <p className="font-medium text-destructive">{bloodType}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG value={qrData} size={180} level="H" />
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Valid until: {validUntil}
          </div>

          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onDownload}
              data-testid="button-download-card"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={onPrint}
              data-testid="button-print-card"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
