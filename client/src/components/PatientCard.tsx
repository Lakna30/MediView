import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, User } from "lucide-react";

interface PatientCardProps {
  name: string;
  image?: string;
  patientId: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  bloodType?: string;
  lastVisit?: string;
  onViewProfile?: () => void;
  onViewRecords?: () => void;
}

export default function PatientCard({
  name,
  image,
  patientId,
  age,
  gender,
  email,
  phone,
  bloodType,
  lastVisit,
  onViewProfile,
  onViewRecords,
}: PatientCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover-elevate">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Patient Profile</CardTitle>
        <Badge variant="outline" className="text-xs">
          ID: {patientId}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {age} years, {gender}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Email</p>
            <p className="flex items-center gap-1 text-sm">
              <Mail className="w-3 h-3" />
              {email}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Phone</p>
            <p className="flex items-center gap-1 text-sm">
              <Phone className="w-3 h-3" />
              {phone}
            </p>
          </div>
          {bloodType && (
            <div>
              <p className="text-muted-foreground mb-1">Blood Type</p>
              <p className="font-medium">{bloodType}</p>
            </div>
          )}
          {lastVisit && (
            <div>
              <p className="text-muted-foreground mb-1">Last Visit</p>
              <p className="flex items-center gap-1 text-sm">
                <Calendar className="w-3 h-3" />
                {lastVisit}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" onClick={onViewProfile} data-testid="button-view-profile">
            View Profile
          </Button>
          <Button size="sm" variant="outline" onClick={onViewRecords} data-testid="button-view-records">
            Medical Records
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
